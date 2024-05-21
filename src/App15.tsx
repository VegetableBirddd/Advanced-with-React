import Space from "./components/Space"

export default ()=>{
    return <>
        <Space align="end" direction="horizontal">
            <div>1</div>
            <div>
                <div>
                    2.1
                    <div>
                        2.1.1
                    </div>
                </div>
                <div>
                    2.2
                </div>
                <div>
                    2.3
                </div>
            </div>
            <div>3</div>
            <div>4</div>
        </Space>
    </>
}