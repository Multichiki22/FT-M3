function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let i = 0
  while(i!==max){
    i++
    if (i%3==0 && i%5==0){
      yield "Fizz Buzz"
    }else if (i%3==0){
      yield "Fizz"
    }else if (i%5==0){
      yield "Buzz"
    }else{
      yield i
    }
    }
  }

  



module.exports = fizzBuzzGenerator;
