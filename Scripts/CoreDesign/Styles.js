// Function name:	ChangeStyle
// Description:		Link different external stylesheets to this page by modifying the html

function ChangeStyle(strStyle) {

    var style = '';

    // Use strStyle parameter if not blank
    if (strStyle != '') {
        style = strStyle;
    }
    else {
        // Otherwise read the item selected in the drop down list directly (alternative to passing as a parameter)
        style = document.StyleForm.colour.options[document.StyleForm.colour.selectedIndex].value;
    }

    // Find the page element with id=stylesheet
    // Then change its hyperlink (href)
    // Note that the css directory is added before the style name and the .css extension after
    // Also a double / (i.e. // is required as / is used by Javascript for special escape characters

    document.getElementById('stylesheet').href = "/Content/" + style + ".css";

    // set cookie for 31 days
    SetCookie('PageStyle', style, 31);


    // return true indicating the function completed.
    return true;
}

// Function name:	Load()
// Description:		Try to read the cookie named PageStyle.
//					Retrieve its value and pass it to ChangeStyle
function Load() {

    // Try to read cookie
    var style = GetCookie('PageStyle');

    // if value found then set page style
    if (style != null) {
        ChangeStyle(style);
        return true;
    }
    else
        return false;
}