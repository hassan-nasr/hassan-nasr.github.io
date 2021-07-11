import './App.css';
import {useEffect, useState, useLayoutEffect} from 'react'
import html2pdf from "html2pdf.js";

let allItems = [
    {name: "دستاوردها", value: "achievement"},
    {name: "شغل کنونی", value: "currentJob"},
    {name: "سابقه‌ی شغلی", value: "jobs"},
];

function SetName({str, className}) {
    let temp = str.split(' ');
    return <div className={className}>{temp.map((item, index) =>
        <div key={index}
             className={index < temp.length - 1 ? 'space' : ''}>{(index === temp.length - 1 ? ':' : '') + item}</div>)}</div>
}

function RightSection({state}) {
    return <div className='right-section'>
        <div style={{flex: 1}}>
            <div className='name'>
                {state.name}
            </div>
            {state.self ?
                <div className='left-padding'>
                    <div className='titleSection'>
                        مشخصات
                    </div>
                    <div className='item-row'>
                        <div className='left-title'>
                            <div className='space'> سال</div>
                            <div>:تولد</div>
                        </div>
                        <div className='left-value'>{state.year}</div>
                    </div>
                    <div className='item-row'>
                        <div className='left-title'>
                            <div className='space'> استان</div>
                            <div className='space'> محل</div>
                            <div>:سکونت</div>
                        </div>
                        <div className='left-value'>{state.city}</div>
                    </div>
                </div> : null}
            {state.education ?
                <div className='left-padding'>
                    <div className='titleSection'>
                        تحصیلات
                    </div>
                    <div className='item-row'>
                        <div className='left-title'>
                            <div className='space'> مقطع</div>
                            <div>:تحصیلی</div>
                        </div>
                        <div className='left-value'>{state.studies}</div>
                    </div>
                    <div className='item-row'>
                        <div className='left-title'>:توضیحات</div>
                        <div className='left-value'>{state.studiesDesc}</div>
                    </div>
                </div> : null}
            {state.phone ?
                <div className='left-padding'>
                    <div className='titleSection'>
                        راه‌های ارتباطی
                    </div>
                    <div className='item-row'>
                        <div className='left-title'>
                            <div className='space'> تلفن</div>
                            <div>:همراه</div>
                        </div>
                        <div className='left-value'>{state.phone}</div>
                    </div>
                </div> : null}
        </div>
    </div>
}

function CVItem({items, name}) {
    return <div className='item-container'>
        <div className='header'>
            <div className='line'/>
            <div className='header-title'>
                {name}
            </div>
        </div>
        <div className='main-item'>
            <div className='item'>
                <div className='item-row'>
                    <SetName str={items.labels.title} className={'row-title'}/>
                    <div className='row-value'>{items.title}</div>
                </div>
                <div className='item-row'>
                    <SetName str={items.labels.date} className={'row-title'}/>
                    <div className='row-value'>{items.cvDate}</div>
                </div>
                <div className='item-row'>
                    <SetName str={items.labels.desc} className={'row-title'}/>
                    <div className='row-value'>{items.desc}</div>
                </div>
            </div>
        </div>
    </div>
}

function LeftSection({state}) {
    return <div className='left-section'>{
        allItems.map((category, index) => state[category.value] ?
            state[category.value + 'Items'].map((item, innerIndex) =>
                <CVItem key={index * 10 + innerIndex} items={item} name={category.name}/>) : null)
    }
        {state.talent ? <div className='item-container'>
            <div className='header'>
                <div className='line'/>
                <div className='header-title'>
                    استعدادها
                </div>
            </div>
            <div className='talent-item'>
                {state.talentItems?.map((item, index) => <div key={index} className='talent'>{item}</div>)}
            </div>
        </div> : null}
    </div>
}

function App() {
    const [state, setState] = useState({})
    useEffect(() => {
        try {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlSearchParams.entries());
            setState({...state, ...JSON.parse(params['params'])})
            setTimeout(() => {
                let dom = new XMLSerializer().serializeToString(document);
                var opt = {
                    margin: 0,
                    filename: 'myfile.pdf',
                    html2canvas: {scale: 2},
                    jsPDF: {unit: 'in', format: 'A4', orientation: 'portrait'}
                };
                html2pdf(dom, opt);
            }, 1000)
        } catch (e) {
            console.log('error')
        }
    }, [])
    return Object.keys(state).length > 0 ? (
        <div className="App">
            <LeftSection state={state}/>
            <RightSection state={state}/>
        </div>
    ) : null;
}

export default App;

