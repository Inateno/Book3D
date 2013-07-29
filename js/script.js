$( function()
{
  // exemple to load a book by code
  //   var book = new Book3D( ".book3D", true );
  $( "#flipEnd" ).click( function()
  {
    console.log( "kjenzfkjnefkjn" );
    Book3D.getBooks()[ 0 ].close();
  } );
  $( "#flipStart" ).click( function()
  {
    Book3D.getBooks()[ 0 ].open();
  } );
} );