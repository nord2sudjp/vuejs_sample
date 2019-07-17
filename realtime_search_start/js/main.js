var app = new Vue({
    el: '#app',
    data: {
        items: null,
        keyword: '',
        message: '',
    },
    watch:{
        keyword: function(newKeyword, oldKeyword){
          //  console.log("watch" + newKeyword)
          this.message = "Waiting for you to stop typing"
          this.debouncedGetAnswer()
        }
    },
    created: function(){
      // console.log("Created")
      // this.keyword = 'JavaScript'
      // this.getAnswer()
      this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
    },
    methods: {
        getAnswer: function(){
           console.log("getAnswer:"  + this.keyword)
           if(this.keyword === ''){
             this.items = null
             return
           }
           this.message = 'Loading....'
           var vm = this
           var params = {page:1, per_page:20, query:this.keyword}
           axios.get('https://qiita.com/api/v2/items', { params })
              .then(function(response){
                  console.log(response)
                  vm.items = response.data
              })
              .finally(function(){
                  vm.message = ''
              })
        }
    }
})
