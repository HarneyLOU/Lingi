package jfk.lab2.reflection;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayDeque;
import java.util.LinkedHashSet;
import java.util.Queue;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class Command {

	private final String PACKAGES = "--list-packages";
	private final String CLASSES = "--list-classes";
	private final String METHODS = "--list-methods";
	private final String FIELDS = "--list-fields";
	private final String CTORS = "--list-ctors";

	private final String SCRIPT = "--script";

	private ZipInputStream zip;
	String jarPath;

	public void run(String[] args) {
		Queue<String> arguments = new ArrayDeque<String>();
		for (String arg : args)
			arguments.add(arg);

		if (arguments.poll().equals("--i")) {
			jarPath = arguments.poll();
			execute(arguments);
		}
	}

	private void loadFile(String jarPath) {
		try {
			zip = new ZipInputStream(new FileInputStream(jarPath));
		} catch (FileNotFoundException e) {
			System.err.println("Source file not found");
		}
	}

	private void execute(Queue<String> arguments) {
		String command = arguments.poll();

		switch (command) {
		case PACKAGES:
			listPackages(arguments);
			break;
		case CLASSES:
			listClasses(arguments);
			break;
		case METHODS:
			listMethods(arguments);
			break;
		case FIELDS:
			listFields(arguments);
			break;
		case CTORS:
			listCtors(arguments);
			break;
		case SCRIPT:
			String scriptPath = arguments.poll();
			if (arguments.poll().equals("--o")) {
				String jarNewPath = arguments.poll();
				String tempPath = jarNewPath.substring(0, jarNewPath.length() - ".jar".length());
				
				JarHandler.extract(jarPath,	tempPath);
				
				ScriptHandler scriptHandler = new ScriptHandler(tempPath);
				ScriptReader scriptReader = new ScriptReader(scriptHandler);
				
				if(scriptReader.read(scriptPath)) {
					if(JarHandler.pack(tempPath, jarNewPath)) System.out.println("File was successfully saved!");
				}
				JarHandler.delete(tempPath);
			}
			break;
		default:
			System.err.println("Wrong command");
		}
	}
	
	private void listCtors(Queue<String> arguments) {
		loadFile(jarPath);
		if (arguments.size() != 1)
			System.err.println("Wrong arguments");
		else {
			URL[] urls;
			try {
				urls = new URL[] { new URL("jar:file:" + jarPath + "!/") };
				URLClassLoader urlClassLoader = new URLClassLoader(urls);
				Class<?> clazz = urlClassLoader.loadClass(arguments.poll());
				for(Constructor method : clazz.getConstructors()) {
					System.out.print(method.getName()+" (");
					for(Parameter param: method.getParameters()) {
						System.out.print(param.getType().getName() + " " + param.getName() + " ");
					}
					System.out.print(")\n");
				}
			} catch (MalformedURLException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				System.err.println("Class not found");
			}
		}
	}
	
	private void listFields(Queue<String> arguments) {
		loadFile(jarPath);
		if (arguments.size() != 1)
			System.err.println("Wrong arguments");
		else {
			URL[] urls;
			try {
				urls = new URL[] { new URL("jar:file:" + jarPath + "!/") };
				URLClassLoader urlClassLoader = new URLClassLoader(urls);
				Class<?> clazz = urlClassLoader.loadClass(arguments.poll());
				for(Field method : clazz.getDeclaredFields()) {
					System.out.println(method.getName());
				}
			} catch (MalformedURLException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				System.err.println("Class not found");
			}
		}
	}

	private void listMethods(Queue<String> arguments) {
		loadFile(jarPath);
		if (arguments.size() != 1)
			System.err.println("Wrong arguments");
		else {
			URL[] urls;
			try {
				urls = new URL[] { new URL("jar:file:" + jarPath + "!/") };
				URLClassLoader urlClassLoader = new URLClassLoader(urls);
				Class<?> clazz = urlClassLoader.loadClass(arguments.poll());
				for(Method method : clazz.getDeclaredMethods()) {
					System.out.print(method.getName()+" (");
					for(Parameter param: method.getParameters()) {
						System.out.print(param.getType().getName() + " " + param.getName() + " ");
					}
					System.out.print(")\n");
				}
			} catch (MalformedURLException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				System.err.println("Class not found");
			}
		}
	}

	private void listPackages(Queue<String> arguments) {
		loadFile(jarPath);
		if (arguments.size() != 0)
			System.err.println("Wrong arguments");
		else {
			LinkedHashSet<String> classNames = new LinkedHashSet<String>();
			ZipEntry entry;
			try {
				for (entry = zip.getNextEntry(); entry != null; entry = zip.getNextEntry()) {
					if (!entry.isDirectory() && entry.getName().endsWith(".class")) {
						String className = entry.getName().replace('/', '.');
						className = className.substring(0, className.length() - ".class".length());
						int index = className.lastIndexOf(".");
						classNames.add(className.substring(0, index));
					}
				}
				show(classNames);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	private void listClasses(Queue<String> arguments) {
		loadFile(jarPath);
		if (arguments.size() != 0)
			System.err.println("Wrong arguments");
		else {
			LinkedHashSet<String> classNames = new LinkedHashSet<String>();
			ZipEntry entry;
			try {
				for (entry = zip.getNextEntry(); entry != null; entry = zip.getNextEntry()) {
					if (!entry.isDirectory() && entry.getName().endsWith(".class")) {
						String className = entry.getName().replace('/', '.');
						classNames.add(className.substring(0, className.length() - ".class".length()));
					}
				}
				show(classNames);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	private void show(LinkedHashSet<String> data) {
		for (String name : data) {
			System.out.println(name);
		}
	}

}
