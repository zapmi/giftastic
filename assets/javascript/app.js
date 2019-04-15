$(function () {

    // show the objects in buttons array as buttons
    function showButtons() {
        var topics = [
            "jack nicholson",
            "robot",
            "monkey",
            "space",
            "rick and morty",
            "snakes",
            "Bob Ross"
        ];
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>")
            $("#buttons").append(button);
            button.attr("data-person", topics[i]);
            button.html(topics[i]);
        }
    }
    showButtons();

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

    });
});
