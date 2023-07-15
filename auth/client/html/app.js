var app = new Vue({
  el: '#app',
  data() {
    return {
      page: 'Prisijungimas',
      pageList: ['Prisijungimas', 'Registracija'],
      input: ['login', 'pass', 'email', 're_pass'],
    }
  },
  watch: {},
  methods: {
    handleClick(page) {

      let login, email, pass, re_pass;

      if (document.getElementById('login')?.value) {
        login = document.getElementById('login').value;
      }

      if (document.getElementById('email')?.value) {
        email = document.getElementById('email').value; 
      }

      if (document.getElementById('pass')?.value) {
        pass = document.getElementById('pass').value;
      }

      if (document.getElementById('re_pass')?.value) {
        re_pass = document.getElementById('re_pass').value;
      }




      if(login && (login.length < 5 || login.length > 20)) {
      const notValid = document.getElementById('notvalid'); 

        // Add 'show' class 
        notValid.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
          // Remove 'show' class
          notValid.classList.remove('show');
        }, 5000);


        console.log('trumpas/ilgas');
        return;
      }


      if(login && (pass.length < 5 || pass.length > 20)) {
        const notValid = document.getElementById('notvalid'); 
  
          // Add 'show' class 
          notValid.classList.add('show');
          
          // Hide after 5 seconds
          setTimeout(() => {
            // Remove 'show' class
            notValid.classList.remove('show');
          }, 5000);
  
  
          console.log('trumpas/ilgas pass');
          return;
        }




        
        if(email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if(!emailRegex.test(email)) {
            const notValid = document.getElementById('notvalid'); 

            // Add 'show' class 
            notValid.classList.add('show');
            
            // Hide after 5 seconds
            setTimeout(() => {
              // Remove 'show' class
              notValid.classList.remove('show');
            }, 5000);
    
    
            console.log('formats email');
    
            return;  
          }
      }



      
      // Check format
      if(login) {

      const formatRegex = /^[A-Za-z]+_[A-Za-z]+$/;

      if(!formatRegex.test(login)) {
        const notValid = document.getElementById('notvalid'); 

        // Add 'show' class 
        notValid.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
          // Remove 'show' class
          notValid.classList.remove('show');
        }, 5000);


        console.log('formats');

        return;  
      }
    }




      
      if(/\d/.test(login)) {
        const notValid = document.getElementById('notvalid'); 

        // Add 'show' class 
        notValid.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
          // Remove 'show' class
          notValid.classList.remove('show');
        }, 5000);


        console.log('raides');


        return;
      }




      if(re_pass) {

        // Compare pass and rePass
        if(pass !== re_pass) {
          const notValid = document.getElementById('notvalid'); 

          // Add 'show' class 
          notValid.classList.add('show');
          
          // Hide after 5 seconds
          setTimeout(() => {
            // Remove 'show' class
            notValid.classList.remove('show');
          }, 5000);
  
  
          console.log('nesutampa passai');
          return;
        }
      
      }




      alt.on('web:accNotValidLogin', () => {
        const notValid = document.getElementById('notvalid'); 

        // Add 'show' class 
        notValid.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
          // Remove 'show' class
          notValid.classList.remove('show');
        }, 5000);


        console.log('su loginu');

        return;

      });



    
      alt.on('web:accRegsistered', () => {
        const notValid = document.getElementById('notvalid'); 

        // Add 'show' class 
        notValid.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
          // Remove 'show' class
          notValid.classList.remove('show');
        }, 5000);

        console.log('su registracija, gal ip sutampa');

        return;
      });


      switch (page) {
            
        case 'Prisijungimas':
          if ('alt' in window) {
            alt.emit('cef::auth:authorization', { login, pass })
          }
          break;

        case 'Registracija':
          if ('alt' in window) {
            alt.emit('cef::auth:registration', { login, email, pass, re_pass })
          }
          break;
      }
    }
  }
})
