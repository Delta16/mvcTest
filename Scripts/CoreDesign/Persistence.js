//
// JavaScript Persistance Functions
//

// Cookies

// Function name:	SetCookie(strCookieName, strCookieValue, intLifeTimesDays)
// Description:		Set a cookie assigning value to name with expiry date today + number of days
// Parameters:		strCookieName		Name of cookie
//					strCookieValue 		Value of cookie
//					intLifeTimeDays		Number of days cookie is valid (expire after today + this value)

function SetCookie(strCookieName, strCookieValue, intLifeTimesDays)
{
	// Declare a new date object for cookie expiry
	var dateExpiry = new Date();
	
	// Set the expiry date to be today + the lifetime days
	dateExpiry.setDate(dateExpiry.getDate() + intLifeTimesDays);
	
	// Example:  document.cookie = name='value';expires=Mon, 10 Jun 2012 19:25:07 GMT;path=/
	// name='value' - escape() encloses value in single quotes
	// expires in string format
	// path =/ (root) allows all pages in site to access this cookie
	document.cookie = strCookieName+"="+escape(strCookieValue) + "; expires="+ dateExpiry.toUTCString() + "; path=/";
	
	return true;
}

// Function name:	GetCookie(strCookieName, strCookieValue, intLifeTimesDays)
// Description:		Get the cookie value for a given name by searching all cookies name/values for the page 
// Parameters:		strCookieName		Name of cookie to get
// Return:			Cookie value or NULL if cookie name not found
// Usage Example:	value = GetCookie(cookieName);
// Ref:				Based on http://techpatterns.com/downloads/javascript_cookies.php/

function GetCookie(strCookieName) {
	// Step 1: Read document.cookie and split it into name/value pairs (there may be many seperated by ;)
	// document.cookie returns only the name=value pairs from the cookie
	var arrayCookies = document.cookie.split(';');
	
	// Declare some vars which will be used during the search
	var cookieTest = '';
	var strSearchName = '';
	var strSearchValue = '';
	var boolFound = false;

	// Step 2: Search all cookie pairs until strCookieName is found using this loop..
	for ( i = 0; i < arrayCookies.length; i++ )
	{
		// Split apart name=value pair
		cookieTest = arrayCookies[i].split('=');
		
		// remove left/right whitespace
		strSearchName = cookieTest[0].replace(/^\s+|\s+$/g, '');

		// Step 3: if the extracted name matches is the one required, retrieve the value
		if ( strSearchName == strCookieName )
		{
			boolFound = true;
			// Handle case where cookie has no value but exists (no = sign, that is):
			if ( cookieTest.length > 1 )
			{
				// remove whitespace and escape characters
				strSearchValue = unescape( cookieTest[1].replace(/^\s+|\s+$/g, '') );
			}
			// Return found value and break this loop
			return unescape(strSearchValue);
			break;
		}
		//clean up
		cookieTest = null;
		strSearchName = '';
	}
	// if not found then return null
	if ( !boolFound )
	{
		return null;
	}
}
