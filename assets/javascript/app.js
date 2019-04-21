$(function () {

    var topics = [
        "planet",
        "astroid",
        "milky way",
        "space",
        "wormhole",
        "time travel",
        "aliens",
        "stars",
        "quantum",
        "cosmos",
        "astronomy",
        "event horizon",
    ];
    // show the objects in buttons array as buttons
    function showButtons() {
        $("#topicButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>")
            $("#topicButtons").append(button);
            button.addClass("butTopics");
            button.attr("data-person", topics[i]);
            button.text(topics[i]);
        }
    }
    showButtons();

    document.onkeydown = function () {
    document.getElementById("anything-input").style.backgroundColor = "red";
    }
    document.onkeyup = function () {
        document.getElementById("anything-input").style.backgroundColor = "blue";
        }

    $("#addTopic").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();


        // This line will grab the text from the input box
        var anything = $("#anything-input").val().trim();
        // $("#anything-input").val("");

        // The movie from the textbox is then added to our array
        topics.push(anything);

        showButtons();
        getData();

    });


    getData();

    function getData() {

        $("button").on("click", function () {
            var person = $(this).attr("data-person");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                person + "&api_key=5l53Dh3iTD2VujKK5utYcGxKRCNJVN9n&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {
                        var gifDiv = $("<div>");
                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        var personImage = $("<img>");
                        personImage.attr("src", results[i].images.fixed_height_still.url);
                        personImage.attr("data-still", results[i].images.fixed_height_still.url);
                        personImage.attr("data-animate", results[i].images.fixed_height.url);
                        personImage.attr("data-state", "still");
                        personImage.attr("class", "gif");

                        $(personImage).on("click", function () {
                            var state = $(this).attr("data-state");
                            console.log(state);

                            if (state == "still") {
                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", "animate");
                            }
                            if (state == "animate") {
                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", "still");
                            }
                        });
                        gifDiv.prepend(p);
                        gifDiv.prepend(personImage);

                        $("#gifs-appear-here").prepend(gifDiv);

                    }

                });
            $("#gifs-appear-here").empty();

        });

    }
});