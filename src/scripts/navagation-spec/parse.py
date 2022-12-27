# pip3 install pandas
# pip3 install openpyxl
# In VSCode, Command-Shift-P, "Python: Select interpreter", select the one marked "Global"

# To run, in Terminal,
# $ python3 parse.py

import pandas

workbook = pandas.read_excel('navigation-spec-test.xlsx')
print('workbook:', workbook)
print('workbook.columns:', workbook.columns)
print('workbook.columns.values[0]:', workbook.columns.values[0])
print('workbook["Type"].iloc[0]:', workbook['Type'].iloc[0])
print('number of rows by `len(workbook)`:', len(workbook)) # number of rows
print('number of rows by `workbook[workbook.columns[0]].count()`:', workbook[workbook.columns[0]].count())
print('(number-of-rows, number-of-columns) by `workbook.shape`:', workbook.shape) # (number-of-rows, number-of-columns)
print('number of rows by `workbook.shape[0]`:', workbook.shape[0]) # number of rows
print('number of columns by `workbook.shape[1]`:', workbook.shape[1]) # number of columns
rowsCount, columnsCount = workbook.shape
print('rowsCount, columnsCount by `rowsCount, columnsCount = workbook.shape`', rowsCount, columnsCount)
