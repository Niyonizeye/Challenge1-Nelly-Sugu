const UserContainer = document.querySelector('.raw');

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
                    <input type="text" value ="${item._id}" class="task_id">
                </div>                    
                
                <button class="show-modal">Get User’s Posts</button>
            </div>          
            
            `;
            UserContainer.insertAdjacentHTML('beforeend', html);

            const modal = document.querySelector('.modal');

            const overlay = document.querySelector('.overlay');

            const btnCloseModal = document.querySelector('.close-modal');

            const btnsOpenModel = document.querySelectorAll('.show-modal');

            const openModel = ()=>{

                modal.classList.remove('hidden');

                overlay.classList.remove('hidden');
            }

            const closeModel = ()=>{

                modal.classList.add('hidden');

                overlay.classList.add('hidden');
            }

            for(let i=0; i<btnsOpenModel.length; i++){
                btnsOpenModel[i].addEventListener('click', async (e) => {

                        const user_id = i+1;
    
                        e.preventDefault();
    
                        await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                           console.log(data);
                        })
                        .catch(err => console.log(err));                    
                })
            }

            btnCloseModal.addEventListener('click', closeModel);

            overlay.addEventListener('click',closeModel);
        })

    })
    .catch(err => console.log(err))
}

getusers();
