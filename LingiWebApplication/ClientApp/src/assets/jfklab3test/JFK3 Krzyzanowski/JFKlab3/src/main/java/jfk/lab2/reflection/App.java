package jfk.lab2.reflection;


import java.io.IOException;
import javassist.CannotCompileException;
import javassist.NotFoundException;

public class App 
{
    public static void main( String[] args ) throws IOException, NotFoundException, CannotCompileException
    {
    	Command command = new Command();
    	command.run(args);
    }
}
