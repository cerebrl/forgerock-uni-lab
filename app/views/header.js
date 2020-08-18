export default function (state) {
  return `
    <a class="scrollToTop" href="#"><i class="fa fa-angle-up"></i></a>
    <header id="header">
      <nav class="navbar navbar-default navbar-static-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand"
            ><img src="_static/img/FEC_logo.png" height="50" alt=""
          /></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul id="menu" class="nav navbar-nav custom_nav">
            <li>
              <a href="/">Home</a>
            </li>
            ${ !state.authenticated ?
              `<li class="logged-out">
                <a href="/login">Sign In</a>
              </li>` :
              ``
            }
            ${ state.authenticated ?
              `<li class="logged-in">
                <a href="catalog">Browse</a>
              </li>
              <li class="logged-in">
                <a href="logout">Log out</a>
              </li>` :
              ``
            }
          </ul>
        </div>
      </div>
      </nav>
    </header>
  `
};
