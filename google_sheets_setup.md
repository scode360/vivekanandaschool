# Google Sheets & Email Integration Setup

To connect your admission form to your Google Spreadsheet and send confirmation emails, follow these steps:

## 1. Open Your Spreadsheet
Open your Google Spreadsheet: [Admission Details Sheet](https://docs.google.com/spreadsheets/d/1JIt4llMf4NLGiRhqoGRnTzOTCE5cFWOmEk3Sr6ke3MA/edit?usp=sharing)

## 2. Open Apps Script Editor
- In your Spreadsheet, go to **Extensions** > **Apps Script**.

## 3. Paste the Backend Code
Delete any existing code in the editor and paste the following:

```javascript
/**
 * Vivekananda School Admission Form Handler
 * Stores data in Google Sheets & Sends Confirmation Email
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0]; // Use the first sheet

    // 1. Append data to Google Sheet
    // Columns: Timestamp, Student Name, DOB, Gender, Grade, Father, Mother, Phone, Email, Address
    sheet.appendRow([
      new Date(),
      data.studentName,
      data.dob,
      data.gender,
      data.grade,
      data.fatherName,
      data.motherName,
      "'" + data.phone, // Adding ' to force string (prevents scientific notation)
      data.email,
      data.address
    ]);

    // 2. Send Confirmation Email to Parent
    const subject = "Admission Application Received - Vivekananda School";
    const body = `
      Dear applicant,

      Thank you for submitting an admission application for ${data.studentName} to Vivekananda School, Bagalur for the 2026-27 academic session.

      We have received your details for Grade: ${data.grade}. Our admission committee will review the application and contact you shortly for the next steps (Interview/Assessment).

      Application Summary:
      - Student Name: ${data.studentName}
      - Applied Grade: ${data.grade}
      - Phone Number: ${data.phone}

      Warm regards,
      Admission Desk
      Vivekananda School, Bagalur
      Ph: +91 94439 40772
    `;

    // Only attempt email if valid email address
    if (data.email) {
      MailApp.sendEmail(data.email, subject, body);
    }

    return ContentService.createTextOutput(JSON.stringify({result: "success"})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({result: "error", message: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 4. Deploy as Web App
- Click **Deploy** > **New deployment**.
- Select Type as **Web app**.
- Description: `Admission Form Backend`
- Execute as: **Me** (Your email)
- Who has access: **Anyone** (This is required for the form to submit)
- Click **Deploy**.
- Copy the **Web App URL** (it should look like `https://script.google.com/macros/s/.../exec`).

## 5. Update Status
- **Success!** I have already updated the `admissions.html` file with your URL: `https://script.google.com/macros/s/AKfycbyFl-WUpG8YAKgiz80Edi2xq82YNToTG6tyfvgEaOjsiB0J8nVox6_maWPf0lyNBdNq/exec`.
- You don't need to manually edit the file anymore.

Your form is now live and will store data in your spreadsheet!
