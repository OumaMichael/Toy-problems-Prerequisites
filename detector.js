function checkspeed(speed) {
    const speedLimit = 70;
    if (speed <= speedLimit) {
        console.log("OK");
    } else {
        const points = Math.floor((speed - speedLimit) / 5);
        if (points >= 12) {
            console.log("License suspended");
        } else {
            console.log("Points: ", points);
        }
    }
};
speed = [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 155];
console.log(speed.map(checkspeed));
speed.forEach(checkspeed);