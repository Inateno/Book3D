/* Lib Book3D
by - Antoine Rogliano aka @Inateno
Free of use, change, share
*/
( function( w )
{
  var Book3D = function( selector, init )
  {
    var _pages = null;
    var _self = this;
    var _currentPage = -1;
   
    this.selector = selector;
    
    this.init = function()
    {
      this.refreshBinding();
      
      $( window ).resize( function( e )
      {
        centering( $( _self.selector ) );
      } );
      $( this.selector + '>button' ).click( function( e )
      {
        _self.changePage( $( e.target ).attr( 'data-origin' ) );
      } );
      centering( $( _self.selector ) );
    }
    
    /****************
    * @open
    go to first page with a scroll effect
    */
    this.open = function()
    {
      $( _self.selector ).addClass( "bookClose" );
      $( _self.selector ).removeClass( "bookCloseEnd" );
      if ( _currentPage != 0 )
      {
        _currentPage = 0;

        var i = 20;
        var np = 0;
        for ( var n = 0; n < _pages.length; ++n )
        {
          setTimeout( function()
          {
            $( _pages[ np ] ).delay( i )
              .addClass( "pageRight" )
              .addClass( "poff" );
            np++;
            $( _pages[ 0 ] ).removeClass( "poff" );
          }, i );
          i += 90;
        }
      }
      $( this.selector + ' button[data-origin="next"]' ).fadeIn( 1000 );
      $( this.selector + ' button[data-origin="previous"]' ).fadeOut( 1000 );
    }
    
    /****************
    * @close
    inverse function of openBook
    */
    this.close = function()
    {
      $( _self.selector ).addClass( "bookCloseEnd" );
      $( _self.selector ).removeClass( "bookClose" );
      if ( _currentPage != -1 )
      {
        _currentPage = _pages.length;

        var i = 20;
        var np = 0;
        for ( var n = 0; n < _pages.length; ++n )
        {
          setTimeout( function()
          {
            $( _pages[ np ] ).delay( i )
              .removeClass( "pageRight" )
              .removeClass( "poff" );
            np++;
          }, i );
          i += 90;
        }
      }
      $( this.selector + ' button[data-origin="next"]' ).fadeOut( 1000 );
      $( this.selector + ' button[data-origin="previous"]' ).fadeIn( 1000 );
    }
    
    /****************
    * @changePage
    called when changePage
    */
    this.changePage = function( target )
    {
      if ( ( target == "previous" && _currentPage == 0 )
      || ( target == "next" && _currentPage >= _pages.length ) )
        return;
      
      if ( target == "next" )
      {
        $( _pages[ _currentPage ] )
          .removeClass( "pageRight" );
        if ( _pages.length > _currentPage + 1 )
        {
          $( _pages[ _currentPage + 1 ] )
            .removeClass( "poff" );
        }
        _currentPage += 1;
      }
      else
      {
        $( _pages[ _currentPage - 1 ] )
          .addClass( "pageRight" );
        if ( _pages.length > _currentPage )
        {
          $( _pages[ _currentPage ] )
            .addClass( "poff" );
        }
        _currentPage -= 1;
      }
      
      if ( _currentPage == 0 )
      {
        $( this.selector + ' button[data-origin="previous"]' ).hide();
        $( this.selector ).addClass( "bookClose" );
      }
      else
      {
        $( this.selector + ' button[data-origin="previous"]' ).fadeIn( 1000 );
        $( this.selector ).removeClass( "bookClose" );
      }
      if ( _currentPage >= _pages.length )
      {
        $( this.selector + ' button[data-origin="next"]' ).hide();
        $( this.selector ).addClass( "bookCloseEnd" );
      }
      else
      {
        $( this.selector + ' button[data-origin="next"]' ).fadeIn( 1000 );
        $( this.selector ).removeClass( "bookCloseEnd" );
      }
    }
    
    /****************
    * @refreshBinding
    added or removed page inside the dom ? call this function to update it
    */
    this.refreshBinding = function()
    {
      _pages = $( this.selector + '>.page' );
      // _pages.addClass( "pageRight poff");
      // $( _pages[ 0 ] ).removeClass( "poff");
    }
    
    if ( init )
      this.init();
    
    books.push( this );
  }
  
  function centering( jel )
  {
    if ( !jel.hasClass( 'centered' ) )
      return;
    
    var parent = jel.parent();
    if ( document.body == parent.parent()[ 0 ] )
      parent = $( window );
    
    var l = parent.width() / 2 - jel.width() / 2;
    var t = parent.height() / 2 - jel.height() / 2;
    jel[ 0 ].style.top  = t + "px";
    jel[ 0 ].style.left = l + "px";
  }
  
  var booksel = [], books = [];
  $( window ).load( function()
  {
    console.log( "loading book3D" );
    booksel = $( ".book3D.autoload" );
    for ( var i = 0; i < booksel.length; ++i )
    {
      var book = new Book3D( ".book3D:eq(" + i + ")", true );
      book.open();
    }
  } );
  
  Book3D.getBooks = function()
  {
    return books;
  }
  
  w.Book3D = Book3D;
})( window );