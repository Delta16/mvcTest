//
// JavaScript Form Validation Functions
//


// Globals - available to all functions

// the css class which will be applied to a field
var strErrorClass = "inputError";



// Function name:	ProcessForm(strFormName)
// Description:		Display form values using an alert box
//					
// Parameters:		strFormName		Name of the form to be processed
// Return:			true - success; continue submit
//					false - fail; corect form mistakes

function ProcessForm(strFormName)
{

	// Validation section
	
	var boolValid = false;
	
	// Total validators
	var intTotalValidators = 4;
	
	// intValidCount is incremented when a validator passes 
	var intValidCount = 0;
	
	
	// The 4 Validators ...
	
	// Validate FirstName (required)
	if (ValidateRequired('Contact', 'FirstName') == true)
	{
		intValidCount++;
	}
	
	// Validate LastName (required)
	if (ValidateRequired('Contact', 'LastName') == true)
	{
		intValidCount++;
	}
	
	// Validate PostCode (required)
	if (ValidateRequired('Contact', 'PostCode') == true)
	{
		intValidCount++;
	}
	
	// Validate email
	if (ValidateEmail('Contact', 'Email') == true)
	{	
		intValidCount++;
	}


if (intValidCount == intTotalValidators)
	{
		boolValid = true;
	}


	// Validation passes
	if (boolValid == true)
	{
		// Declare a string to hold form values
		var strFormData = '';
		
		// Get all of the form elements - copy to the FormFields array
		// Note elements includes form fields, fieldsets, etc.
		var FormFields = document.getElementById(strFormName).elements;
		
		// Process the fields with using for loop
		// to count trough each from 0 to the the end (length of the FormFields array)
		for(var i = 0; i < FormFields.length; i++)
		{
			// Non field elements have not been named and so are not added to strFormData
			if (FormFields[i].name != null && FormFields[i].name != '')
			{
				if (FormFields[i].required == "required" && FormFields[i].value == "")
				{
					alert(FormFields[i].name + " is a required field");
				}
				// name: value added for each form field
				// \t = tab and \n = new line
				strFormData += FormFields[i].name + ":\t\t" + FormFields[i].value + "\n\n"
			}
		}
		
		// Display strFormData in an alert box
		alert(strFormData);
		
		// true indicates successful validation - form will be submitted to server action script if defined
		// Form fields will be cleared
		return true;
	}
	else
		{
			return false;
		}
}


// Function name:	ValidateRequired(strFormName, strFieldID)
// Description:		Validate a required field
//					If field blank, show error and return false
//					Otherwise return true
//					
// Parameters:		strFormName		Name of the form to be processed
// Return:			true - no error
//					false - error
//

function ValidateRequired(strFormName, strFieldID)
{

	// Validate: If the field is null or blank then display error
	if (document.forms[strFormName][strFieldID].value == null || document.forms[strFormName][strFieldID].value == '')
	{
		// Show error in an alert box
		//alert(document.forms[strFormName][strFieldID].name  + " is a required field");
		
		// Apply the css error class to the field 
		document.forms[strFormName][strFieldID].className = strErrorClass;
		
		// Display an error message.
		document.getElementById(strFieldID+"Error").innerHTML = strFieldID + " is required";
		
		// Return false - force form redisplay
		return false;
	}
	// No errors
	else
	{
		// Clear any error messages
		document.forms[strFormName][strFieldID].className = "";
		document.getElementById(strFieldID+"Error").innerHTML = "";
		
		// Return true - continue submit
		return true;
	}
}


// Function name:	ValidateEmail(strFormName, strFieldID)
// Description:		Validate an email address field
//					by matching it against a regex
//					
// Parameters:		strFormName		Name of the form to be processed
//					strFieldID		Name of the form field to be validated.
// Return:			true - no error
//					false - error
//

function ValidateEmail(strFormName, strFieldID)
{
	// Declare instance of RegExp - note no quotes areound expression
	var regExEmail = /^\s*[a-z\d_]+(\.[a-z\d_]+)*@[a-z\d\-]{1,255}\.[a-z]{2,6}\s*$/;
	
	// Use the RegExp test method to test the email value against the expression 
	var result = regExEmail.test(document.forms[strFormName][strFieldID].value);

	// Validate: If the field is null or blank then display error
	if (!result)
	{
		
		// Apply the css error class to the field 
		document.forms[strFormName][strFieldID].className = strErrorClass;
		
		// Display an error message.
		document.getElementById(strFieldID+"Error").innerHTML = "Valid email address required";
		
		// Return false - force form redisplay
		return false;
	}
	// No errors
	else
	{
		// Clear any error messages
		document.forms[strFormName][strFieldID].className = "";
		document.getElementById(strFieldID+"Error").innerHTML = "";
		
		// Return true - continue submit
		return true;
	}
}

