 //"https://autosuggest-backend.onrender.com/api/autosuggest?q=a&weighted=true&algorithm=trie&limit=8"
   var API_URL = "https://autosuggest-backend.onrender.com/api/autosuggest" ;

   var searchBar = document.getElementById("searchbar");
   var searchsuggestions = document.getElementById("search-suggestions");

   
   //get user typed data
   //use user typed data in the query in API call.
   //API call
   //Append all the search suggestions to div tag in UI.
   searchBar.addEventListener("input",function(){
     var query = searchBar.value.trim();
     console.log(query);
     fetchSuggestions(query);
   });

   function fetchSuggestions(query){
    var fullAPI = API_URL+ "?q="+ query + "&weighted=true&algorithm=trie&limit=8"
    fetch(fullAPI)
         .then(function(res){
            return res.json();
         })
         .then(function(data){
            console.log(data);
            showSuggestions(data);
            return;
         })
         .catch(function(err){
            console.log("Error:"+err);
         })
   }
   function showSuggestions(data){
    var values = data.results;
    if(values.count == 0){
        searchsuggestions.innerHTML = "<div> no matching results found </div>";
    }
    else{
        var htmlString ="";
        for(var i = 0;i<values.length;i++){
           htmlString += "<div><span class='suggestion-item'>" + values[i].text +"</span><span class='item-weight'>"+ values[i].weight+"</span></div>";
        }
        searchsuggestions.innerHTML = htmlString;
    }
   }