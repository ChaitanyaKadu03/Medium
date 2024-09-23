const hashing = async (value: string): Promise<String> => {
    // convert from Uint16Array to Uint8Array 
    const theValue: ArrayBuffer = new TextEncoder().encode(value)

    // convert from Uint8Array to hash Array Buffer 
    const myDigest: ArrayBuffer = await crypto.subtle.digest("SHA-256", theValue)

    // convert from hash Array Buffer to Uint16Array
    const hash_value: string = Array.from(new Uint8Array(myDigest)).map((byte) => byte.toString(16).padStart(2, '0')).join("")

    return hash_value
}

export default hashing