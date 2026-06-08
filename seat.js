
 const moviearray = [{ name: 'spiderman', price: 10 },
        {name:'batman',price:20},
        { name: 'ironman', price: 30 }
];
    
    const selectseatarr = [];


const movieselect = document.getElementById('movie')

const continuebtn = document.getElementById('continue')
const cancelbtn = document.getElementById('cancel')


function getmoviename()
{
  
   
    
    const moviename  = document.getElementById('moviename')
    
    moviearray.forEach(
        (i) => {
            movieselect.innerHTML += `<option value="${i.name}">${i.name} $${i.price}</option>`;
        }
    )

    movieselect.addEventListener('change', () => {
      moviename.innerHTML = movieselect.value     
    })

  
    
    
}


function getPrice() {
    const movieprice = document.getElementById('price');
     
    const sseat = selectseatarr.length;


    movieselect.addEventListener('change', () => {
        moviearray.forEach((movie) => {
            if (movie.name === movieselect.value) {
                movieprice.innerHTML = `$${movie.price}`;
            }
        })
    })
    
 console.log(sseat)
}


function getseat()
{
    const seat = document.querySelectorAll('.seat');
    const seatnumbercont = document.querySelector('.selected-seats')
    seat.forEach((s,index) => {
        s.addEventListener('click', () => {
            if (s.classList.contains('occupied')) { return; }

          
            s.classList.toggle('selected');
            const seatnumber = document.createElement('p');
            seatnumber.classList.add('selected-seat');
            seatnumber.innerHTML = index + 1;
            if (s.classList.contains('selected') ==  true)
            {
                selectseatarr.push(index + 1);
            seatnumbercont.appendChild(seatnumber);

            }
            else
            {
                selectseatarr.splice(selectseatarr.indexOf(index + 1), 1);
                const existingSeats = seatnumbercont.querySelectorAll('.selected-seat');
                existingSeats.forEach(el => {
                    if (el.innerHTML == (index + 1)) seatnumbercont.removeChild(el);
                });
            }
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
            }

            

        })
        
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
            }
        })
    })
}



function updatesummary()
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






getmoviename()
getPrice()
updatesummary()
getseat()
