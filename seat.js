
 const moviearray = [{ name: 'spiderman', price: 10 },
        {name:'batman',price:20},
        { name: 'ironman', price: 30 }
];  //for storing movie objects name and price 
    
    const selectseatarr = [];  //selected seats array in globe


const movieselect = document.getElementById('movie');  //movie select tag

const continuebtn = document.getElementById('continue'); //continue button
const cancelbtn = document.getElementById('cancel'); //cancel button
 

function getmoviename()  //function to get movie name and price 
{
  
   
    
    const moviename  = document.getElementById('moviename')  //movie display para 
    
    moviearray.forEach(
        (i) => {
            movieselect.innerHTML += `<option value="${i.name}">${i.name} $${i.price}</option>`;
        }
    )  //looping moviearray object and display movie and price in option tag

    movieselect.addEventListener('change', () => {
        moviename.innerHTML = movieselect.value;
    }) //display value of option in movie para 

  
    
    
}


function getPrice() {  //function to get movie price and display it price para 
    const movieprice = document.getElementById('price');
     
  


    movieselect.addEventListener('change', () => {
        moviearray.forEach((movie) => {
            if (movie.name === movieselect.value) {
                movieprice.innerHTML = `$${movie.price}`;
            }
        })
    })  //event listner of change in select 
        //inside it moviearray loop to display price in price para 
    
}


function getseat() //function to get seat number
{
    const seat = document.querySelectorAll('.seat'); //selecting seats 
    const seatnumbercont = document.querySelector('.selected-seats') //seat container
    seat.forEach((s,index) => { //s=seats index = seat number
        s.addEventListener('click', () => { 
            if (s.classList.contains('occupied')) { return; } //disable click if occupied 

            s.classList.toggle('selected'); //toogle selected class
            const seatnumber = document.createElement('p'); //create seat number element para
            seatnumber.classList.add('selected-seat'); //added class
            seatnumber.innerHTML = index + 1; //updating seat number with index +1

            if (s.classList.contains('selected') ==  true)
            {
                selectseatarr.push(index + 1);
            seatnumbercont.appendChild(seatnumber);

            }  //if seat have selected class then add seat number to seat array  append seat element para to cont

            else
            {
                selectseatarr.splice(selectseatarr.indexOf(index + 1), 1);
                const existingSeats = seatnumbercont.querySelectorAll('.selected-seat');
                existingSeats.forEach(el => {
                    if (el.innerHTML == (index + 1)) seatnumbercont.removeChild(el);
                });
            }  // if no selected class in seat then splice seat array and remove seat select element 
        })

        continuebtn.addEventListener('click', () => { 
                if (s.classList.contains('selected'))
                {
                    s.classList.remove('selected');
                    s.classList.add('occupied');
                    const selectedSeatElements = seatnumbercont.querySelectorAll('.selected-seat');
                    selectedSeatElements.forEach(el => {
                        if (el.innerHTML == (index + 1)) seatnumbercont.removeChild(el);
                    });

                    selectseatarr.length = 0;
                    const seatprice = document.getElementById('seat-price');
                    seatprice.innerHTML = `$0`;
            }  //make seat class occupied and reset element once chosen

            

        }) //looping seats to update its classes of select and occupied 
           //and also handling continue and cancel button
        
        cancelbtn.addEventListener('click', () => { 

            if (s.classList.contains('selected'))
            {
                s.classList.remove('selected');
                const selectedSeatElements = seatnumbercont.querySelectorAll('.selected-seat');
                selectedSeatElements.forEach(el => {
                    if (el.innerHTML == (index + 1)) {
                        seatnumbercont.removeChild(el);
                    }
                   
                });
            } //used to reset elements 
        })
    })
}



function updatesummary() //function to update total seats and price 
{
    const movieprice = document.getElementById('price'); 
    const seatprice = document.getElementById('seat-price');
    const sseat = selectseatarr.length;
    const totalseat = document.getElementById('seat-number')
     
    const update = () => {
        const selectedMovie = moviearray.find(m => m.name === movieselect.value);
        if (selectedMovie) {
            seatprice.innerHTML = `$${selectedMovie.price * selectseatarr.length}`;
            totalseat.innerHTML = `${selectseatarr.length}`;
        }
    };
    movieselect.addEventListener('change', update);
    document.addEventListener('click', update);
}






getmoviename() //function to  display movie name and price
getPrice() //function to display price  in price para 
updatesummary() //function to calculate total seat and price 
getseat() //function to get seat number and store it in select seat array
