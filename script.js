const UserContainer = document.querySelector('.raw');

const UserPost = document.querySelector('.userposts');

const url = 'https://jsonplaceholder.typicode.com/users';

const getusers = async () => {

    await fetch(url)
    .then((response) =>{

        return response.json();
    })
    .then((data) =>{
        data.forEach((item, index) =>{

            const html = `
            <div class="user_info_content">

                <div class="user_info">
                    <label>User information</label><br>
                    -------------------------------
                    <p>Name: ${item.name}</p>
                    <p>Email: ${item.email}</p>
                </div>                    
                
                <button class="show-modal">Get User’s Posts</button>
            </div>          
            
            `;
            UserContainer.insertAdjacentHTML('beforeend', html);
        })

        const modal = document.querySelector('.modal');

        const overlay = document.querySelector('.overlay');

        const btnCloseModal = document.querySelector('.close-modal');

        const btnsOpenModel = document.querySelectorAll('.show-modal')

        const openModel = function(){

            modal.classList.remove('hidden');

            overlay.classList.remove('hidden');

        }
       

        const closeModel = function(){

            modal.classList.add('hidden');

            overlay.classList.add('hidden');
        }

        for(let i=0; i<btnsOpenModel.length; i++){

            btnsOpenModel[i].addEventListener('click', async ()=>{

                await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${i+1}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    data.forEach((item, index) =>{

                        const html = `
                        <div class="userpost" style="margin-bottom:20px">
                             <strong> ${item.id}</strong>
                            <h5> Title: </h5>
                            ${item.title}

                            <h5> Body: </h5>
                            ${item.body}                 
                        </div>          
                        
                        `;
                        UserPost.insertAdjacentHTML('beforeend', html);
                        openModel();
                    })
                })
                .catch(err => console.log(err)); 

            })
        }
        btnCloseModal.addEventListener('click', closeModel);
        
        overlay.addEventListener('click',closeModel);



        // const btn = document.querySelector('.show-modal');

        
        // btn.addEventListener('click', async () => {

                           
        // })

    })
    .catch(err => console.log(err))
}

getusers();
