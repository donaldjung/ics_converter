const ical = require('ical.js');
const fs = require('fs');

fs.readFile('basic.ics', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading .ics file:", err);
        return;
    }

    try { // Add a try-catch block for parsing
        const jcalData = ical.parse(data);
        const comp = new ical.Component(jcalData);
        const events = comp.getAllSubcomponents('vevent');

        let textOutput = "";
        events.forEach(event => {
            const summary = event.getFirstPropertyValue('summary');
            const start = event.getFirstPropertyValue('dtstart');
            const end = event.getFirstPropertyValue('dtend');
            const description = event.getFirstPropertyValue('description');

            textOutput += `Event: ${summary || "No Summary"}\n`; // Provide default value
            textOutput += `Start: ${start ? start.toJSDate() : "No Start Date"}\n`; // Check if start exists
            textOutput += `End: ${end ? end.toJSDate() : "No End Date"}\n`; // Check if end exists
            if (description) {
                textOutput += `Description: ${description}\n`;
            }
            textOutput += "\n";
        });

        fs.writeFileSync('calendar.txt', textOutput, 'utf-8');
        console.log("Calendar data saved to calendar.txt");
    } catch (parseError) {
        console.error("Error parsing .ics data:", parseError);
    }
});