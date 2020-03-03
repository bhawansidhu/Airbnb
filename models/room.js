const room =
{

    fakeDB : [],

    init()
    {

        this.fakeDB.push({image:`image/beautiful apartment.jpg`,title:'luxurious and modern Apartment',description:` Beautiful luxurious and modern Apartment in peaceful enviroment`
        ,price:`CAD 130 avg/night`});
    
        this.fakeDB.push({image:`image/apartment.jpg`,title:'One bedroom Luxurious apartment',description:`Beautiful luxurious and modern Apartment in peaceful enviroment`,price:`CAD $80 avg/night`});
    
        this. fakeDB.push({image:`image/big apartment.jpg`,title:'Entire three bedroom apartment',description:`Beautiful luxurious and modern Apartment in peaceful environment`,price:`CAD $150 avg/night`});


        this. fakeDB.push({image:`image/cottage.jpg`,title:'two bedroom in a large house',description:`Beautiful luxurious and modern Apartment in peaceful environment`,price:`CAD $90 avg/night`});


        this.fakeDB.push({image:`image/cozy house.jpg`,title:'One large bedroom apartment',description:`Beautiful luxurious and modern Apartment in peaceful environment`
        ,price:`CAD $80 avg/night`});
    
        this.fakeDB.push({image:`image/delhi center.jpg`,title:'beautiful house in a countryside area',description:`Beautiful luxurious and modern Apartment in peaceful environment with Amazing Views!`,price:`CAD $120 avg/night`});
    
        this. fakeDB.push({image:`image/house.jpg`,title:'Entire House',description:`Beautiful luxurious and modern Apartment in peaceful environment`,price:`CAD $50 avg/night`});


        this. fakeDB.push({image:`image/residency.jpg`,title:'Village Residency 1',description:`Beautiful luxurious and modern place in peaceful environment`,price:`CAD $50 avg/night`});
    },
    getallRooms()
    {
        return this.fakeDB;
    }

}


room.init();
module.exports=room;