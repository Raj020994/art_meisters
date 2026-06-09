import React from 'react'

const Onboarding = () => {
    let isEdit=false;
    if (isEdit){
        return (
            <div>
                <h1>Edit Profile</h1>
            </div>
        )
    }
  return (
    <div>
        <h1>Onboarding</h1>
    </div>
  )
}

export default Onboarding