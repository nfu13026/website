function loadScript(url,callback)
{
	// Adding the script tag to the head as suggested before
    var calculator = document.getElementById( 'sses-calculator' );
    var script = document.createElement('script');
    	script.type = 'text/javascript';
    	script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    calculator.parentNode.appendChild(script);
}

var loadCalculatorCode = function() {
	var request = new XMLHttpRequest();

	request.open('GET', 'https://spendsmart.extension.iastate.edu/wp-json/ssescalculator/v1/data', true);
	
	request.onload = function() {
	    // Success!
		if (request.status >= 200 && request.status < 400) {
		    var response = request.responseText;

		    var calculator = document.getElementById( 'sses-calculator' );

		    calculator.setAttribute( 'data-calculatordata', response )
		} 

    	// We reached our target server, but it returned an error
		else {
	  	}
	};

  	// There was a connection error of some sort
	request.onerror = function() {
	};

	request.send();
}

var loadCalculator = function() {
	loadScript( 'https://spendsmart.extension.iastate.edu/calculator/calculator.js', loadCalculatorCode );
}

var loadReactDom = function() {
	loadScript( 'https://spendsmart.extension.iastate.edu/calculator/libraries/react-dom.min.js', loadCalculator );
}

var loadReact = function() {
	loadScript( 'https://spendsmart.extension.iastate.edu/calculator/libraries/react-with-addons.min.js', loadReactDom );
}

loadReact();

// Add stylesheet tag
var calculator = document.getElementById( 'sses-calculator' );
var stylesheet = document.createElement('link');
	stylesheet.rel = 'stylesheet';
	stylesheet.href = 'calculator.css';
	stylesheet.type = 'text/css';

calculator.parentNode.insertBefore(stylesheet, parent.firstChild);
calculator.parentNode.insertBefore(calculator.nextSibling);