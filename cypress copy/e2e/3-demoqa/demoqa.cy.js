import { TextboxPage } from "../../pageObjects/textbox.page";
import { CheckboxPage } from "../../pageObjects/checkbox.page";
import { RadioButtonsPage } from "../../pageObjects/radiobuttons.page";
import { WebTablesPage } from "../../pageObjects/webtables.page";

describe("Demoqa", () => {

    context("Text Box", () => {
      beforeEach(()=>{
        TextboxPage.visit();
      });
      it("Enter text field values - positive", () => {
        TextboxPage.fullnameTextField.type("John");
        TextboxPage.userEmailField.type("aaa@bbb.xyz");
        TextboxPage.currentAddressTextField.type("Some random current address");
        TextboxPage.permanentAddressTextField.type("Some random permanent address");
        TextboxPage.submitButton.click();
        TextboxPage.nameOutput.should("have.text", "Name:John");
        TextboxPage.emailOutput.should("have.text", "Email:aaa@bbb.xyz");
        TextboxPage.currentAddressOutput.should(
          "contain.text",
          "Current Address :Some random current address"
        );
        TextboxPage.permanentAddressOutput.should(
          "contain.text",
          "Permananet Address :Some random permanent address"
        );
      });

      it("Enter text field values - negative", () =>{
        TextboxPage.userEmailField.should("not.have.class", "field-error");
        TextboxPage.userEmailField.type("aaa@bbb");
        TextboxPage.submitButton.click();
        TextboxPage.userEmailField.should("have.class", "field-error");
      });
    });


    context("Check Boxes", () => {
      beforeEach(()=>{
        CheckboxPage.visit();
      });
      it("Check the checkboxes", () => {
        CheckboxPage.expandButton.click();
        CheckboxPage.checkboxes.contains("Notes").click();
        CheckboxPage.checkboxes.contains("Angular").click();
        CheckboxPage.checkboxes.contains("Private").click();
        CheckboxPage.checkboxes.contains("Excel File.doc").click();
        CheckboxPage.checkedCheckboxesOutput.should(
          "have.text",
          "You have selected :notesangularprivateexcelFile"
        );
        CheckboxPage.textSuccess.should('contain.text', "notes");
        CheckboxPage.textSuccess.should('contain.text', "angular");
        CheckboxPage.textSuccess.should('contain.text', "private");
        CheckboxPage.textSuccess.should('contain.text', "excelFile");
      });
    });


    context("Radio buttons", () => {
      beforeEach(()=>{
        RadioButtonsPage.visit();
      });
      it("Clicl radio button - Yes", () => {
        RadioButtonsPage.radioButtons.contains("Yes").click();
        RadioButtonsPage.resultOutput.should(
          "have.text",
          "You have selected Yes"
        );
        RadioButtonsPage.textSuccess.should("have.text", "Yes");
      });

      it("Click radio button - Impressive", () =>{
        RadioButtonsPage.radioButtons.contains("Impressive").click();
        RadioButtonsPage.resultOutput.should(
          "have.text",
          "You have selected Impressive"
        );
        RadioButtonsPage.textSuccess.should(
          "have.text",
          "Impressive"
        );
      });

      it("Click radio button - No", () =>{
        RadioButtonsPage.radioButtons.contains("No").should("have.class", "disabled");
      });

    });

    context.only("Web tables", () => {

      beforeEach(()=>{
        WebTablesPage.visit();
      });

      it("Create new item", () => {
        WebTablesPage.addNewRecordButton.click();
        WebTablesPage.firstNameTextField.type("John");
        WebTablesPage.lastNameTextField.type("Wick");
        WebTablesPage.emailTextField.type("aaa@bbb.ccc");
        WebTablesPage.ageTextField.type("99");
        WebTablesPage.salaryTextField.type("9999999");
        WebTablesPage.departmentTextField.type("Yolo");
        WebTablesPage.submitButton.click();

        WebTablesPage.rows.should("contain.text", "aaa@bbb.ccc");
      });

      it("Delete all items", () =>{
        //WebTablesPage.rowsDeleteButtons.click({ multiple: true});
        WebTablesPage.deleteRowBasedOnOption("Cierra").click();
        WebTablesPage.deleteRowBasedOnOption("Alden").click();
        WebTablesPage.deleteRowBasedOnOption("Kierra").click();

        WebTablesPage.noRowsMessage
        .should("be.visible")
        .and("contain.text", "No rows found");
      });

    });


  });