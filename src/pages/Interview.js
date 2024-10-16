
import React from "react";

import ItemDeletionAppWithAPI from "../components/learnproject/ItemDeletionApp";
import { compose } from "@reduxjs/toolkit";
import VideoCall from "../components/vidiocall/vidiocall";

const Interview = () => {

     // 1 Array to object 
            //using forecach
        // let array = ['a', 'b', 'c'];
        // let object = {}

        //  array.forEach( (element,index) => {
        //     object[index] =element
        // });
        // console.log(object)

        // let object = {}
        // array.map( (element, index) => {
        //     return (object[index] = element)
        // })
        // console.log(object)
        

        //   const data = array.reduce( (acc, item, index) => {  
        //         acc[index] = item
        //         return acc
        //     }, {})
        //     console.log(data)

        // First Iteration (index = 0):

        //     item = 'a'
        //     acc = {} (initially an empty object)
        //     acc[0] = 'a' (setting the key 0 to value 'a')
        //     Now acc = { 0: 'a' }


// 2 object to array convert 

    // A Object.keys(obj)
    // B Object.values(obj)
    // C Object.entries(obj)

    // const obj = { a: 1, b: 2, c: 3 };

    // const array = [];
    // for (let key in obj) {
    // if (obj.hasOwnProperty(key)) {
    //     array.push( [ key , obj[key]]); // Adding both key and value
    // }
    // }
    // console.log(array);
// Output: [['a', 1], ['b', 2], ['c', 3]]


// Find min value
const array = [10, 5, 20, 3, 8];

// Find min value

// const minValue = array.reduce((min, current) => {
//   if (current < min) {
//     return current;
//   } else {
//     return min;
//   }
// }, array[0]);

// const maxValue = array.reduce((max, current) => {
//   if (current > max) {
//     return current;
//   } else {
//     return max;
//   }
// }, array[0]);

// console.log(minValue); // Output: 3
// console.log(maxValue); // Output: 20

// function factorialRecursive(n) {

//     let result = 1;
//     for (let i = 2; i <= n; i++) {
//         result *= i
//     }
//     return result;
//   }
//   console.log(factorialRecursive(5)); // Output: 120
  let check;

//   function peledrom( str1, str2) {
//     if( str1.split('').sort().join('') === str2.split('').sort().join('') ) {
//         return true
//     } else {
//         return false
//     }
//   }
//   console.log( peledrom("helo", "lohe"))

const arrays = [1, 3, 4, 5, 6, 7];


 const ids = arrays.filter(itemId => itemId !== 3)

 console.log(ids);
 
 let evenNumbers = [];
// for (let i = 0; i < arrays.length; i++) {
//   if (arrays[i] % 2 === 0) {
//     evenNumbers.push(arrays[i]);
//   }
// }
// console.log(evenNumbers); // Output: [2, 4, 6, 8, 10]


    return <div>
        <VideoCall/>
        <ItemDeletionAppWithAPI/>
        
    </div>
}

export default Interview;