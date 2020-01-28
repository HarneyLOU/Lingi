package jfk.lab2.reflection;

import java.io.*;
import java.nio.file.Files;
import java.util.Scanner;

import javassist.CannotCompileException;
import javassist.ClassPool;
import javassist.CtClass;
import javassist.CtConstructor;
import javassist.CtField;
import javassist.CtMethod;
import javassist.CtNewConstructor;
import javassist.CtNewMethod;
import javassist.NotFoundException;
import javassist.bytecode.Descriptor;

public class ScriptHandler {

	private String tempJar;

	ClassPool classPool;

	public ScriptHandler(String jarNewPath) {

		tempJar = jarNewPath;

		classPool = ClassPool.getDefault();
		try {
			classPool.insertClassPath(tempJar);
		} catch (NotFoundException e) {
			System.err.println("Provided jar could not be loaded as class path");
		}
	}

	public void addPackage(String name) {
		name = name.replace(".", "/");
		new File(tempJar + "/" + name).mkdir();
	}

	public void removePackage(String name) {
		name = name.replace(".", "/");
		File file = new File(tempJar + "/" + name);
		deleteDirectory(file);

	}

	public void addClass(String name) throws CannotCompileException, IOException {
		CtClass myClass = classPool.makeClass(name);
		save(name, myClass);
	}

	public void setInterface(String name, String interfaceName) throws CannotCompileException, IOException, NotFoundException {
		CtClass myClass = classPool.get(name);
		CtClass myInterface = classPool.get(interfaceName);
		myClass.defrost();
		myClass.addInterface(myInterface);
		save(name, myClass);
	}

	public void removeClass(String name) throws NotFoundException {
		CtClass myClass = classPool.get(name);
		myClass.detach();
		name = name.replace(".", "/");
		File file = new File(tempJar + "/" + name + ".class");
		file.delete();
	}

	public void addInterface(String name) throws FileNotFoundException, IOException, CannotCompileException {
		CtClass myClass = classPool.makeInterface(name);
		save(name, myClass);
	}

	public void addMethod(String name, String method) throws CannotCompileException, IOException, NotFoundException {
		CtClass myClass = classPool.get(name);
		myClass.defrost();
		CtMethod newMethod = CtNewMethod.make(method, myClass);
		myClass.addMethod(newMethod);
		save(name, myClass);
	}

	public void removeMethod(String name, String method)
			throws FileNotFoundException, IOException, CannotCompileException, NotFoundException {
		CtClass myClass = classPool.get(name);
		myClass.defrost();
		CtMethod myMethod = myClass.getDeclaredMethod(method);
		myClass.removeMethod(myMethod);
		save(name, myClass);
	}

	public void setMethodBody(String name, String method, String newMethodBody)
			throws CannotCompileException, IOException, NotFoundException {
		CtClass myClass = classPool.get(name);
		myClass.defrost();
		CtMethod myMethod = myClass.getDeclaredMethod(method);
		myMethod.setBody(newMethodBody);
		save(name, myClass);
	}

	public void addBeforeMethod(String name, String method, String code)
			throws CannotCompileException, IOException, NotFoundException {
		CtClass myClass = classPool.get(name);
		myClass.defrost();
		CtMethod myMethod = myClass.getDeclaredMethod(method);
		myMethod.insertBefore(code);
		save(name, myClass);
	}

	public void addAfterMethod(String name, String method, String code)
			throws CannotCompileException, IOException, NotFoundException {
		CtClass myClass = classPool.get(name);
		myClass.defrost();
		CtMethod myMethod = myClass.getDeclaredMethod(method);
		myMethod.insertAfter(code);
		save(name, myClass);
	}

	public void addField(String name, String field) throws CannotCompileException, IOException, NotFoundException {
		CtClass myClass = classPool.get(name);
		myClass.defrost();
		myClass.addField(CtField.make(field, myClass));
		save(name, myClass);
	}

	public void removeField(String name, String fieldName)
			throws CannotCompileException, IOException, NotFoundException {
		CtClass myClass = classPool.get(name);
		myClass.defrost();
		CtField field = myClass.getDeclaredField(fieldName);
		myClass.removeField(field);
		save(name, myClass);
	}

	public void addCtor(String name, String method) throws CannotCompileException, IOException, NotFoundException {
		CtClass myClass = classPool.get(name);
		myClass.defrost();
		myClass.addConstructor(CtNewConstructor.make(method, myClass));
		save(name, myClass);
	}

	public void removeCtor(String name, int i) throws CannotCompileException, IOException, NotFoundException {
		CtClass myClass = classPool.get(name);
		myClass.defrost();
		myClass.removeConstructor(myClass.getConstructors()[i]);
		save(name, myClass);
	}

	public void setCtorBody(String name, int i, String body)
			throws CannotCompileException, IOException, NotFoundException {
		CtClass myClass = classPool.get(name);
		myClass.defrost();
		myClass.getConstructors()[i].setBody(body);
		save(name, myClass);
	}

	private void save(String name, CtClass myClass) throws CannotCompileException, IOException {
		name = name.replace(".", "/");
		File file = new File(tempJar + "/" + name + ".class");
		try (FileOutputStream fos = new FileOutputStream(file)) {
			fos.write(myClass.toBytecode());
		}
	}

	private void deleteDirectory(File file) {
		if (file.isDirectory()) {
			File[] entries = file.listFiles();
			if (entries != null) {
				for (File entry : entries) {
					deleteDirectory(entry);
				}
			}
		}
		file.delete();
	}

	public void addLibrary(String s) throws IOException {
		String path = tempJar + "/META-INF/MANIFEST.MF";
		File manifest = new File(path);
		Scanner reader = new Scanner(manifest);
		boolean alreadyAdded = false;
		StringBuilder manifestText = new StringBuilder();
		while(reader.hasNextLine()) {
			String line = reader.nextLine();
			if(!line.isEmpty()) {
				if(line.toLowerCase().contains("class-path")) {
					line = line + " " + s;
					alreadyAdded = true;
				}
				manifestText.append(line+"\n");
			}
		}
		reader.close();
		BufferedWriter writer = new BufferedWriter(new FileWriter(manifest));
		if(alreadyAdded){
			writer.write(manifestText.toString());
		}
		else {
			manifestText.append("Class-Path: ").append(s).append("\n");
			writer.write(manifestText.toString());
		}
		writer.close();
	}
}
