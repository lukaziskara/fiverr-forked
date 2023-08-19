// import {useState} from "react"
export default function Card(props) {
    // const [isVisible,setIsVisible ] = useState('false');
    // function whenBackCardClicked(){
    //     setIsVisible(props.index)
    //     console.log(props.index,isVisible)
    // }
    // console.log(props)
    // // console.log(word,signsArray,signsArray.length,typeof(signsArray));
    // // სიმბოლოების მასივს დაუვლის და სათითაოდ შეამოწმებს. შემდეგ newWord-ში ჩააწყობს
    // const word = props.word;
    // const marks = [",",".",":",";","!","?"];
    // const newWord = [];
    // const signsArray = word.split("");
    // for(let i=0;i<signsArray.length;i++){
    //     (signsArray[i]==="ࣿ")?
    //         newWord.push(<span className="span_element">{signsArray[i]}</span>):
    //         (marks.includes(signsArray[i]))?
    //             newWord.push(signsArray[i]):
    //             newWord.push(signsArray[i]);
    // }
    // // console.log(newWord,typeof(newWord));
    return (
        <div className="card back_card" onClick={props.onClick}>dwadaf
            
            {/* <div className={props.className} onClick={props.onClick}> */}
            {/* <div className={props.isVisible===props.index?'visible_back':'invisible_back'} onClick={props.whenBackCardClicked()}>
                <p>{props.back}</p>
            </div> */}
        </div>
    )
}