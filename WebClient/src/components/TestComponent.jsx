import React from 'react';



const TestComponent = () => {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <div>
        <button onClick={handleClick}>Click Me!</button>
        </div>
    );
}
export default TestComponent;
