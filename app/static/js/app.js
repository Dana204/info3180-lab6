/* Add your Application JavaScript */
// NEWS-LIST
const Newslist = Vue.component('news-list', {
  template: `
      <div class="news">
        <h2 class="text-center">News</h2>
        <div class="form-inline d-flex justify-content-center">
          <div class="form-group mx-sm-3 mb-2">
            <label class="sr-only" for="search">Search</label>
            <input type="search" name="search" v-model="searchTerm"
            id="search" class="form-control mb-2 mr-sm-2 srchbar" placeholder="Enter a search term here" />
            <button class="btn bg-logoColour text-white mb-2"@click="searchNews">Search</button>
          </div>
        </div>
        <ul class="news__list row justify-content-center mt-3" type ='none'>
          <li class='card mr-4 mb-5 col-lg-3' v-for="article in articles">
            <h5 class='card-title text-center mt-1'>{{ article.title }} </h5>
            <img v-bind:src="article.urlToImage" height="35%" width="100%">
            <p class="card-text text-dark text-center mt-1 pb-3"> {{ article.description}} </p>
          </li>
        </ul>
      </div >
    `,

  created: function () {
    let self = this;
    fetch('https://newsapi.org/v2/everything?q=' + self.searchTerm + '&language=en&apiKey=<key_here>')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        self.articles = data.articles
      });
  },

  data: function () {
    return {
      articles: [],
      searchTerm: ''
    }
  },

  methods: {
    searchNews: function () {
      let self = this;
      fetch('https://newsapi.org/v2/everything?q=' + self.searchTerm + '&language=en&apiKey=<key_here>')
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          self.articles = data.articles;
        });
    }
  }

});

// HEADER
Vue.component('app-header', {
  template: `
        <header>
            <nav class="navbar navbar-expand-lg bg-dark fixed-top">
              <a class="navbar-brand text-white font-weight-bold" href="#">VueJS App</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a class="nav-link text-white" href="/">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link text-white" href="/news">News</a>
                  </li>
                </ul>
              </div>
            </nav>
        </header>    
    `,
  data: function () {
    return {};
  }
});


// FOOTER
Vue.component('app-footer', {
  template: `
        <footer>
            <div class="container ">
                <p class="text-right mt-5">Copyright &copy {{ year }} Flask Inc.</p>
            </div>
        </footer>
    `,
  data: function () {
    return {
      year: (new Date).getFullYear()
    }
  }
});


const Home = Vue.component('home', {
  template: `
    <div class="home row justify-content-center text-center">
      <div class="col col-lg-8">
        <img class="" src="/static/images/logo.png" alt="VueJS Logo">
      <h1 class="">{{ welcome }}</h1>
      </div>
    </div>
  `,
  data: function () {
    return {
      welcome: 'Hello World! Welcome to VueJS News App'
    }
  }
});

const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/news',
      component: Newslist
    }
  ]
});

const app = new Vue({
  el: '#app',
  router
});