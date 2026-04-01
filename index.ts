// let x:number=1;

// console.log(x)

// function greet(firstname:string){
//     console.log("hello" + " " + firstname)
// }
// greet("asheesh")

// function sum(a:number,b:number){
//     return a+b
// }

// let ans=sum(1,2)
// console.log(ans)

// function delayed(anotherfunction:()=> void){
//     setTimeout(anotherfunction,1000)
// }

// function log(){
//     console.log("hello")
// }

// delayed(log)


// type manger={
//     name:string;
//     age:string;
// }
// type User={
//     name:string;
//     book:string;
//     chapter:string
// }

// type intersection= manger & User

// let t:intersection={
//     name:"asheesgerg4h",
//     book:"math",
//     chapter:"5",
//     age:"21"
// }

// console.log(t); 

interface User{
    id:string;
    age:string;
    name:string;
    email:string;
    password:string;
}

type updatesProps= Pick<User,'name' | 'age' |'email'>

type updatePropsOptional=Partial<updatesProps>

function UpdateProps(updateProps:updatesProps){

}