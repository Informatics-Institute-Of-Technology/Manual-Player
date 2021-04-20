import Track from '../models/track';

   
  // constructor() {
  //   this.state = {
  //     TRACKS: [],
  //     isLoading: true
  //   };
  // }

const TRACKS = [
  new Track(
      '1',
    'Adele',
    'https://cdn.pixabay.com/photo/2016/05/16/12/19/ivy-1395534_960_720.jpg',
    'Someone Like You',
    'Falling',
    'Pop',
    'false'
  ),
  new Track(
    '2',
    'Adele',
    'https://images.pexels.com/photos/3817580/pexels-photo-3817580.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'SkyFall',
    'Falling',
    'Pop',
    'false'
  ),
  new Track(
    '3',
    'Adele',
    'https://images.pexels.com/photos/2733337/pexels-photo-2733337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'Hello',
    'Falling',
    'Pop',
    'false'
  ),
  new Track(
    '4',
    'Adele',
    'https://images.pexels.com/photos/889839/pexels-photo-889839.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'Rolling in the deep',
    'Falling',
    'Pop',
    'false'
  ),
  new Track(
    '5',
    'Adele',
    'https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'Make you feel my love',
    'Falling',
    'Pop',
    'false'
  ),
  new Track(
    '6',
    'Adele',
    'https://images.pexels.com/photos/374703/pexels-photo-374703.jpeg?cs=srgb&dl=pexels-burst-374703.jpg&fm=jpg',
    'Set fire to the rain',
    'Falling',
    'Pop',
    'false'
  ),
  new Track(
    '7',
    'Justin Bieber',
    'https://images.pexels.com/photos/374703/pexels-photo-374703.jpeg?cs=srgb&dl=pexels-burst-374703.jpg&fm=jpg',
    'Love Yourself',
    'Falling',
    'Pop',
    'false'
  ),
  new Track(
    '8',
    'Maroon 5',
    'https://images.pexels.com/photos/374703/pexels-photo-374703.jpeg?cs=srgb&dl=pexels-burst-374703.jpg&fm=jpg',
    'Memories',
    'Falling',
    'Pop',
    'false'
  ),
  new Track(
    '9',
    'Ed Sheeran',
    'https://images.pexels.com/photos/374703/pexels-photo-374703.jpeg?cs=srgb&dl=pexels-burst-374703.jpg&fm=jpg',
    'Perfect',
    'Falling',
    'Pop',
    'false'
  ),
  new Track(
    '10',
    'Shakira',
    'https://images.pexels.com/photos/374703/pexels-photo-374703.jpeg?cs=srgb&dl=pexels-burst-374703.jpg&fm=jpg',
    'Nada',
    'Falling',
    'Pop',
    'false'
  )
];

export default TRACKS;



// componentDidMount() {
//   fetch('http://192.168.1.5:8000/song/happy')
//     .then((response) => response.json())
//     .then((json) => {
//       this.setState({ data: json.song });
//     })
//     .catch((error) => console.error(error))
//     .finally(() => {
//       this.setState({ isLoading: false });
//     });
// }
// }
        

