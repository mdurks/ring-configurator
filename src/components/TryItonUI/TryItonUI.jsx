import { Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { degToRad } from 'three/src/math/MathUtils.js'

export const TryItonUI = ({ ringRef }) => {
    const three = useThree()
    const phoneModel = useGLTF('/RringConfiguratorPhone.glb')

    const phoneModelNodes = Object.keys(phoneModel.nodes).map((key) => {
        return phoneModel.nodes[key]
    })
    // console.log('phoneModelNodes', phoneModelNodes)

    useEffect(() => {
        const clockMarkerMesh = three.scene.getObjectByName('ClockMarker')
        clockMarkerMesh.visible = false
    }, [])

    return (
        <>
            {/* <group
                position={[-1.75, 1.7, -0.5]}
                rotation={[degToRad(-30), degToRad(-75), degToRad(-25)]}
                scale={[0.05, 0.05, 0.05]}
            >
                <mesh
                    position={[0, 0, -0.001]}
                    rotation={[0, degToRad(180), 0]}
                >
                    <planeGeometry args={[9.3, 12.5]} />
                    <meshBasicMaterial color={'#ddd1b2'} />
                </mesh>
                <Html castShadow receiveShadow occlude="blending" transform>
                    <div className="letterForm">
                        <h1>Make an enquiry</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur veniam
                            dolores similique, pariatur, et possimus. Ipsam at
                            pariatur cupiditate.
                        </p>
                        <div className="form">
                            <input placeholder="Name" />
                            <input placeholder="Email" />
                            <textarea placeholder="Message" rows="4" />
                            <button type="button">Send</button>
                        </div>
                    </div>
                </Html>
            </group> */}
            <group
                name="TryItOn"
                position={[-1.75, 1.75, 0.175]}
                rotation={[degToRad(25), degToRad(-90), degToRad(22)]}
                scale={[0.08, 0.08, 0.08]}
                visible={false}
            >
                <mesh
                    position={[0, 0, -0.001]}
                    rotation={[0, degToRad(180), 0]}
                    visible={false}
                >
                    <planeGeometry args={[9.3, 12.5]} />
                    <meshBasicMaterial color={'#ddd1b2'} />
                </mesh>

                <Html castShadow receiveShadow occlude="blending" transform>
                    <div className="tryItOnWindow">
                        <h1>Try it on</h1>
                        <img src="/womansHand.jpg" alt="" />
                        {/* <button type="button">Open AR</button> */}
                    </div>
                </Html>

                <group
                    name="MobilePhoneModel"
                    position={[0, -4.5, 0]}
                    rotation={[0, 0, degToRad(3)]}
                    scale={[5, 5, 5]}
                >
                    {phoneModelNodes.map((item) => {
                        return (
                            <mesh
                                key={item.uuid}
                                name={item.name}
                                geometry={item.geometry}
                                position={item.position}
                                rotation={item.rotation}
                                scale={item.scale}
                                material={item.material}
                            />
                        )
                    })}
                </group>
            </group>
        </>
    )
}
