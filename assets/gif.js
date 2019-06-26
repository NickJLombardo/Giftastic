$(document).ready(function(){
var topics = ["frog", "hamster", "dog", "cat", "buffalo", "zebra", "gorilla", "eagle"];


$(document).on("click", 'button', function() {
    
    $('#GIFArea').empty(); 
    var animal= $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=kMnJfPf2sAKelx0vIKCZs3RaDQYo1cTd";
   
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
            console.log(response)
        

       var results= response.data;

       for(var i =0; i<results.length; i++){
            var gifDiv= $('<div>');
            var rating= results[i].rating;
            var r = $('<p>').text("Rating:" + rating);
            var gifImage= $('<img>');

        gifImage.attr('src', results[i].images.fixed_height_still.url)
		        .attr('data-still', results[i].images.fixed_height_still.url)
		        .attr('data-animate', results[i].images.fixed_height.url)
		        .attr('data-state', "still")
                .addClass("showImage");
                               
                 gifDiv.append(r)
                gifDiv.append(gifImage);	   
                 $('#GIFArea').prepend(gifDiv);
        
                            }
                            
      });

     
} );

function buttons(){

$("#animal-view").empty()
for(var i = 0; i<topics.length; i++){

var b = $("<button>");
b.addClass ("animal")
b.attr("data-name", topics[i]);
b.text(topics[i]);
$("#animal-view").append(b);
$("#animal-input").focus();
}

} buttons()

$("#add-animal").on("click", function(){

    event.preventDefault()
    
    var animal2 = $("#animal-input").val().trim()
   topics.push(animal2)
    
    buttons()
 });
});
$(document).on('click', '.showImage',  function() {

    var state = $(this).data('state');
    
    if (state == "still") {
        console.log("still image works");
        $(this).attr('src', $(this).data('animate'))
               .data('state', 'animate');
    } else {
        console.log("animated image works");
        $(this).attr('src', $(this).data('still'))
               .data('state', 'still');               
    }

});
