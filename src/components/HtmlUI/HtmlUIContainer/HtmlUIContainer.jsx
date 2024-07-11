import { ConfigStageNavButtons } from '../ConfigStageNavButtons/ConfigStageNavButtons'

export const HtmlUIContainer = () => {
    return (
        <>
            <div className="introTitle1">
                <h1>
                    <span>Timeless</span> Elegance Awaits
                </h1>
                <p>Discover the art of bespoke jewellery</p>
                {/* <p>
                    Discover the art of bespoke jewellery, where your vision
                    transforms into a masterpiece of beauty and craftsmanship.
                </p> */}
                <div className="introScrollMsg">Scroll&nbsp;&nbsp;down</div>
            </div>
            <div className="introTitle2">
                <h1>Design Your Dream Ring</h1>
                <p>
                    Experience the fusion of exquisite design and unparalleled
                    craftsmanship
                </p>
                {/* <p>
                    xperience the fusion of exquisite design and unparalleled
                    craftsmanship, creating a unique ring that reflects your
                    style.
                </p> */}
            </div>
            <div className="introTitle3">
                <h1>
                    <span>Beauty</span> Tailored to You
                </h1>
                <p>
                    Embrace the elegance of personal style and exceptional
                    artistry
                </p>
                {/* <p>
                    Embrace the elegance of custom jewellery, where each ring is
                    a testament to personal style and exceptional artistry.
                </p> */}
            </div>

            <ConfigStageNavButtons />
        </>
    )
}
