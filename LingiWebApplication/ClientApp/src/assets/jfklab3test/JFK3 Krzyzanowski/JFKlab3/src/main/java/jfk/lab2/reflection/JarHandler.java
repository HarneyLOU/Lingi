package jfk.lab2.reflection;

import javax.management.Attribute;
import java.awt.*;
import java.io.*;
import java.util.*;
import java.util.List;
import java.util.jar.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

public class JarHandler {

	static public List<String> extraJarPaths = new ArrayList<>();
	static public String manifestPath;

	static public void extract(String zipPath, String targetPath) {
		manifestPath = zipPath;
		ZipInputStream zip = null;
		try {
			zip = new ZipInputStream(new FileInputStream(zipPath));
			ZipEntry entry;

			File target = new File(targetPath);
			while ((entry = zip.getNextEntry()) != null) {
				File file = new File(target, entry.getName());

				if (!file.toPath().normalize().startsWith(target.toPath())) {
					throw new IOException("Bad zip entry");
				}

				if (entry.isDirectory()) {
					file.mkdirs();
					continue;
				}

				byte[] buffer = new byte[1024];
				file.getParentFile().mkdirs();
				BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(file));
				int count;

				while ((count = zip.read(buffer)) != -1) {
					out.write(buffer, 0, count);
				}
				
				out.close();
			}
		} catch (FileNotFoundException e) {
			System.err.println("File not found");
			System.err.println(e.getMessage());
		} catch (IOException e) {
			e.printStackTrace();
		}
		finally {
			try {
				zip.close();
			} catch (IOException e) {
				System.err.println("Could not close source file");
			}
		}
	}

	public static boolean pack(String sourceFile, String destinationFile) {
		FileOutputStream fos = null;
		ZipOutputStream zipOut = null;
		try {
			fos = new FileOutputStream(destinationFile);
			zipOut = new JarOutputStream(fos);
			File fileToZip = new File(sourceFile);
			File[] children = fileToZip.listFiles();
			for (File childFile : children) {
				zipFile(childFile, childFile.getName(), zipOut);
			}

		} catch (FileNotFoundException e) {
			System.err.println("Destination jar can not be created");
			System.err.println(e.getMessage());
		} catch (IOException e) {
			System.err.println("Could not pack files");
		}
		finally {
			try {
				zipOut.close();
				fos.close();
			} catch (IOException e) {
				System.err.println("Could not close files");
			}
		}

		try {
			Manifest m = new JarFile(destinationFile).getManifest();
			Attributes a = m.getMainAttributes();
			a.size();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return true;
	}

	private static void zipFile(File fileToZip, String fileName, ZipOutputStream zipOut) throws IOException {
		if (fileToZip.isHidden()) {
			return;
		}
		if (fileToZip.isDirectory()) {
			if (fileName.endsWith("/")) {
				zipOut.putNextEntry(new ZipEntry(fileName));
				zipOut.closeEntry();
			} else {
				zipOut.putNextEntry(new ZipEntry(fileName + "/"));
				zipOut.closeEntry();
			}
			File[] children = fileToZip.listFiles();
			for (File childFile : children) {
				zipFile(childFile, fileName + "/" + childFile.getName(), zipOut);
			}
			return;
		}
			FileInputStream fis = new FileInputStream(fileToZip);
			ZipEntry zipEntry = new ZipEntry(fileName);
			zipOut.putNextEntry(zipEntry);
			byte[] bytes = new byte[1024];
			int length;
			while ((length = fis.read(bytes)) >= 0) {
				zipOut.write(bytes, 0, length);
			}
			fis.close();
	}

	static private void deleteDirectory(File file) {
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

	public static void delete(String tempPath) {
		File file = new File(tempPath);
		deleteDirectory(file);
	}
}
