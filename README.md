## Features

### Adding a new user 

To add a new user to the Birkentech Accounting System, the system administrator needs to add the user to the AWS (Amazon Web Services) Cognito User Pool and select the appropriate User Group (Admin, Manager, or Data Entry staff) for that user. The user will then receive the mail in the email provided with the username and temporary password.  

### Accessing the accounting system 

The first time a user accesses the website, they will login with their temporary username and password. The system will automatically ask the user to reset the password so that they can use their own credentials in the next logins. 

### Home Page 

This will be the first page users see after logging into the system. It shows users a list of the latest 100 records entered in the system. The page provides search-by-keyword functionality and filter by category for convenient record searching. Beside basic details such as ID, Category, Subcategory, Quarter, etc., each record row also contains 2 options, ‘Edit’ and ‘Detail’. The ‘Edit’ button allows the user to edit the record details, and the ‘Detail’ button opens the detail page, which allows the user to see more granular details of that record.  

![alt text](https://github.com/UyenTran218/AccountingSystem-React-Express/blob/main/src/Home.JPG?raw=true)

### Edit Page 

Users with permission can edit the record details on this page by selecting the ‘Edit’ button on a record row shown on Home Page. On the edit record form, the fields are prefilled with the record’s details from the database. Users can change the record details, update a new receipt file, and click the ‘Submit’ button. Users are then asked to confirm the updated details to ensure the entered information is correct before submitting it. 

![alt text](https://github.com/UyenTran218/AccountingSystem-React-Express/blob/main/src/Edit.JPG?raw=true)

### Detail Page 

The detail page shows details of a particular record containing all details recorded into the system. The page also contains a ‘Download PDF’ button that allows the user to download the details of a particular record in the pdf format, which will enable file sharing safely and easily. 

![alt text](https://github.com/UyenTran218/AccountingSystem-React-Express/blob/main/src/Detail.JPG?raw=true)

### Add Item 

Users can add new records to the system by selecting ‘Add Item’ option from the navigation menu at the top of the pages. Users need to fill in the form with required information, attach the receipt file, select submit and review the entered details before adding it to the database.

![alt text](https://github.com/UyenTran218/AccountingSystem-React-Express/blob/main/src/Add.JPG?raw=true)

### Help Page 

The help page gives the user accessibility to contact someone whenever any issue arises. This page shows the email of the administrator so that users can contact them with the issues they are facing.  

### Log Page 

The log page shows activity logs of the system containing information about users’ interactions in the system. The username is auto retrieved from AWS. The admin can see all the logs about vital information such as who created a particular record and when it was updated. The page shows the latest activities with 10 logs per page as default, users can also select different options to see 25 or 50 logs per page. 

![alt text](https://github.com/UyenTran218/AccountingSystem-React-Express/blob/main/src/Log.JPG?raw=true)

### Report Page 

The report page shows vital statistics on business operations. The first functionality that the page has is the CSV file export. Only users with permission can access the report page and export report files. Users can select a category of the records to download all the records belonging to the selected category. They can also filter records by selecting a date range when the records are entered into the system. 

![alt text](https://github.com/UyenTran218/AccountingSystem-React-Express/blob/main/src/Report.JPG?raw=true)
