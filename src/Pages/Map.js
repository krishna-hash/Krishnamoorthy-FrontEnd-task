import React from 'react'
const Map = ({ LATITUDE, LONGITUDE }) => {
    return (
        <div>
            <iframe title="location" src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4013436.3643496064!2d${LONGITUDE}!3d${LATITUDE}5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1625918399631!5m2!1sen!2sin`} style={{ border: "0" }} loading="lazy"></iframe>
        </div>
    )
}

export default Map
