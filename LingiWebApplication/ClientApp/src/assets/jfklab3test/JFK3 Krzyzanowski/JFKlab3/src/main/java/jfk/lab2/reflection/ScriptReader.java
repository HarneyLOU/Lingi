package jfk.lab2.reflection;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Scanner;

import javassist.CannotCompileException;
import javassist.NotFoundException;

public class ScriptReader {

	private final String ADD_PACKAGE = "add-package";
	private final String REMOVE_PACKAGE = "remove-package";
	private final String ADD_CLASS = "add-class";
	private final String SET_INTERFACE = "set-interface";
	private final String REMOVE_CLASS = "remove-class";
	private final String ADD_INTERFACE = "add-interface";
	private final String REMOVE_INTERFACE = "remove-interface";
	private final String ADD_METHOD = "add-method";
	private final String REMOVE_METHOD = "remove-method";
	private final String SET_METHOD_BODY = "set-method-body";
	private final String ADD_BEFORE_METHOD = "add-before-method";
	private final String ADD_AFTER_METHOD = "add-after-method";
	private final String ADD_FIELD = "add-field";
	private final String REMOVE_FIELD = "remove-field";
	private final String ADD_CTOR = "add-ctor";
	private final String REMOVE_CTOR = "remove-ctor";
	private final String SET_CTOR_BODY = "set-ctor-body";
	private final String ADD_LIBRARY = "add-library";

	private ScriptHandler scriptHandler;
	private String scriptPath;
	private int lineCounter;
	private boolean successfull;

	public ScriptReader(ScriptHandler scriptHandler) {
		this.scriptHandler = scriptHandler;
		successfull = true;
	}

	public boolean read(String scriptPath) {
		lineCounter = 0;
		successfull = true;
		this.scriptPath = scriptPath;
		File file = new File(scriptPath);
		Scanner sc;
		try {
			sc = new Scanner(file);
			while (sc.hasNextLine()) {
				String line = sc.nextLine();
				String body = null;
				if(line.contains("#")) {
					body = line.substring(line.indexOf("#")+1, line.lastIndexOf("#"));
				}
				String[] params = line.split(" ");
				executeCommand(params, body);
			}
		} catch (FileNotFoundException e) {
			System.err.println("Script not found");
		}
		return successfull;
	}
	
	private String readText(String textPath) {
		int index = scriptPath.lastIndexOf("\\");
		String fullTextPath = scriptPath.substring(0, index+1) + textPath;
		StringBuilder code = new StringBuilder();
		File file = new File(fullTextPath);
		Scanner sc;
		try {
			sc = new Scanner(file);
			while (sc.hasNextLine()) {
				code.append(sc.nextLine());
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		return code.toString();
	}

	private void executeCommand(String[] param, String body) {
		lineCounter++;
		try {
			String method = null;
			switch (param[0]) {
			case ADD_PACKAGE:
				scriptHandler.addPackage(param[1]);
				break;
			case REMOVE_PACKAGE:
				scriptHandler.removePackage(param[1]);
				break;
			case ADD_CLASS:
				scriptHandler.addClass(param[1]);
				break;
			case SET_INTERFACE:
				scriptHandler.setInterface(param[1], param[2]);
				break;
			case REMOVE_CLASS:
				scriptHandler.removeClass(param[1]);
				break;
			case ADD_INTERFACE:
				scriptHandler.addInterface(param[1]);
				break;
			case REMOVE_INTERFACE:
				scriptHandler.removeClass(param[1]);
				break;
			case ADD_METHOD:
				method = null;
				method = (body != null) ? body : readText(param[2]);
				scriptHandler.addMethod(param[1], method);
				break;
			case REMOVE_METHOD:
				scriptHandler.removeMethod(param[1], param[2]);
				break;
			case SET_METHOD_BODY:
				method = null;
				method = (body != null) ? body : readText(param[3]);
				scriptHandler.setMethodBody(param[1], param[2], method);
				break;
			case ADD_BEFORE_METHOD:
				method = null;
				method = (body != null) ? body : readText(param[3]);
				scriptHandler.addBeforeMethod(param[1], param[2], method);
				break;
			case ADD_AFTER_METHOD:
				method = null;
				method = (body != null) ? body : readText(param[3]);
				scriptHandler.addAfterMethod(param[1], param[2], method);
				break;
			case ADD_FIELD:
				method = null;
				method = (body != null) ? body : readText(param[2]);
				scriptHandler.addField(param[1], method);
				break;
			case REMOVE_FIELD:
				scriptHandler.removeField(param[1], param[2]);
				break;
			case ADD_CTOR:
				method = null;
				method = (body != null) ? body : readText(param[2]);
				scriptHandler.addCtor(param[1], method);
				break;
			case REMOVE_CTOR:
				scriptHandler.removeCtor(param[1], Integer.parseInt(param[2]));
				break;
			case SET_CTOR_BODY:
				method = null;
				method = (body != null) ? body : readText(param[3]);
				scriptHandler.setCtorBody(param[1], Integer.parseInt(param[2]), method);
				break;
			case ADD_LIBRARY:
				scriptHandler.addLibrary(param[1]);
				break;
			default: 
				System.out.println("[" + lineCounter + "]" + "Command unknown");
				successfull = false;
			}
		} catch (FileNotFoundException e) {
			System.err.println("[" + lineCounter + "]" + "File not found");
			successfull = false;
		} catch (NotFoundException e) {
			System.err.println("[" + lineCounter + "]" + "Class/method not found");
			successfull = false;
		} catch (CannotCompileException e) {
			System.err.println("[" + lineCounter + "]" + "Provided code can not be compiled");
			System.err.println(e.getMessage());
			successfull = false;
		} catch(ArrayIndexOutOfBoundsException e) {
			System.err.println("[" + lineCounter + "]" + "Wrong arguments");
			successfull = false;
		} catch (IOException e) {
			System.err.println("[" + lineCounter + "]" + "Error");
			successfull = false;
		}
	}

}
