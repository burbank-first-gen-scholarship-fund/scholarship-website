// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {

    // Get current scroll position
    let scrollY = window.pageYOffset;

    // Now we loop through sections to get height, top and ID values for each
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute("id");

        /*
        - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
        - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
        */
        if (
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight
        ) {
            document.querySelector(".navigation a[href*=" + sectionId + "]").classList.add("active");
        } else {
            document.querySelector(".navigation a[href*=" + sectionId + "]").classList.remove("active");
        }
    });
}

(function () {

    // stringify all input, select, and textaeas in a form
    function toJSONString(form) {
        var obj = {};
        // grab all of the inputs, selects, textareas in a specified form
        var elements = form.querySelectorAll("input, select, textarea");
        for (var i = 0; i < elements.length; ++i) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if (name) {
                obj[name] = value;
            }
        }

        // return JSON stringified
        return JSON.stringify(obj);
    }

    document.addEventListener("DOMContentLoaded", function () {
        // targets a specific form
        var form = document.getElementById("form-contact");

        // REMOVE - this is used only for the test
        var output = document.getElementById("output");

        // submit event listener
        form.addEventListener(
            "submit",
            function (e) {
                e.preventDefault();
                var json = toJSONString(this);

                // REMOVE - this is used only for testing
                output.innerHTML = json;

                // get new XHR object
                var newXHR = new XMLHttpRequest();

                // go to https://hookb.in/ZdNN6D0A to view request!
                newXHR.open("POST", "https://hookb.in/ZB7WNJPa");
                //            ^-- IMPORTANT: to send data to the server with it appearing in the url use 'POST'

                // set the header
                // this lets the server know where/how to expect your data
                newXHR.setRequestHeader("Content-Type", "application/json");

                // this is how form data looks like when you send it with the attributes `action="POST"` on your form
                var formData = json;

                // REMOVE - this is used only for testing
                console.log(formData);

                //
                newXHR.onreadystatechange = function () {
                    if (newXHR.readyState == XMLHttpRequest.DONE) {
                        if (newXHR.status == 200) {
                            document.getElementById("myDiv").innerHTML = newXHR.responseText;
                        } else if (newXHR.status == 400) {
                            alert("There was an error 400");
                        } else {
                            alert("something else other than 200 was returned", newXHR.status);
                            document.getElementById("myDiv").innerHTML = "Our system encountered and error. Your message has not been sent. Please call one of our representatives at 1-866-725-2747 with any questions, issues, or concerns you have.";
                        }
                    }
                };

                // sends form data
                newXHR.send(formData);
            },
            false
        );
    });

})();