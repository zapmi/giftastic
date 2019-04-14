$(function () {

    // show the objects in buttons array as buttons
    function showButtons() {
        var buttons = [
            "jack nicholson",
            "robot",
            "monkey"
        ];
        for (var i = 0; i < buttons.length; i++) {
            $("#buttons").append('<button id="question" data-person="' + buttons[i] + '">' + buttons[i] + '</button>');
        }
    }
    showButtons();

    // $(".gif").on("click", function () {
    //     var state = $(this).attr("data-state");
    //     console.log(state);
    //     if (state == "still") {
    //         $(this).attr("src", $(this).attr("data-animate"));
    //         $(this).attr("data-state", "animate");
    //     }
    //     if (state == "animate") {
    //         $(this).attr("src", $(this).attr("data-still"));
    //         $(this).attr("data-state", "still");
    //     }
    // });

    $("button").on("click", function () {
        var person = $(this).attr("data-person");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=5l53Dh3iTD2VujKK5utYcGxKRCNJVN9n&limit=10";

            // var newQ = "https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif"
            // data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif"
            // data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif";


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
                    personImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(personImage);

                    $("#gifs-appear-here").prepend(gifDiv);
                }

            });

    });
});
