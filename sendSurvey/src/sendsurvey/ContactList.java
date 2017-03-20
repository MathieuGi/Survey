/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sendsurvey;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 *
 * @author mathgira
 */
public class ContactList {

    public ArrayList<ArrayList<String>> contactsList = new ArrayList();

    public void readContactList() throws FileNotFoundException, IOException {
        String excelFilePath = "contacts.xlsx";
        FileInputStream inputStream = new FileInputStream(new File(excelFilePath));
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet firstSheet = workbook.getSheetAt(0);
        Iterator<Row> iterator = firstSheet.iterator();

        while (iterator.hasNext()) {
            ArrayList<String> list = new ArrayList();
            Row nextRow = iterator.next();

            Iterator<Cell> cellIterator = nextRow.cellIterator();
            
            while (cellIterator.hasNext()) {
                Cell cell = cellIterator.next();
                list.add(cell.getStringCellValue());
            }
            if (list.size() != 1) {
                contactsList.add(list);
            }
        }
    }

    public void generateTokens() {
        for (int i = 1; i < contactsList.size(); i++) {
            String uniqueId = UUID.randomUUID().toString();
            contactsList.get(i).add(uniqueId);
        }
    }

    public void writeExcel() {

    }

}
