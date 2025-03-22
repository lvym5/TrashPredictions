import React, { useState } from "react";
import Plot from "react-plotly.js";

const SensorDataPlot = () => {
    const data = [
        { sensor_id: 2, day_name: "Friday", time_of_day: "Morning", average_value: 43.958686426033374 },
        { sensor_id: 2, day_name: "Friday", time_of_day: "Night", average_value: 47.468045795660174 },
        { sensor_id: 2, day_name: "Friday", time_of_day: "Noon", average_value: 43.0252192327251 },
        { sensor_id: 2, day_name: "Monday", time_of_day: "Morning", average_value: 40.80209008202901 },
        { sensor_id: 2, day_name: "Monday", time_of_day: "Night", average_value: 46.07779548733515 },
        { sensor_id: 2, day_name: "Monday", time_of_day: "Noon", average_value: 41.32614939001086 },
        { sensor_id: 2, day_name: "Saturday", time_of_day: "Morning", average_value: 44.40212058335986 },
        { sensor_id: 2, day_name: "Saturday", time_of_day: "Night", average_value: 45.82416592482202 },
        { sensor_id: 2, day_name: "Saturday", time_of_day: "Noon", average_value: 39.55184136279816 },
        { sensor_id: 2, day_name: "Sunday", time_of_day: "Morning", average_value: 38.037228325622145 },
        { sensor_id: 2, day_name: "Sunday", time_of_day: "Night", average_value: 45.819485204586826 },
        { sensor_id: 2, day_name: "Sunday", time_of_day: "Noon", average_value: 41.02363672689253 },
        { sensor_id: 2, day_name: "Thursday", time_of_day: "Morning", average_value: 39.96913880749313 },
        { sensor_id: 2, day_name: "Thursday", time_of_day: "Night", average_value: 47.546368738361245 },
        { sensor_id: 2, day_name: "Thursday", time_of_day: "Noon", average_value: 42.795152350062935 },
        { sensor_id: 2, day_name: "Tuesday", time_of_day: "Morning", average_value: 40.63014920970074 },
        { sensor_id: 2, day_name: "Tuesday", time_of_day: "Night", average_value: 46.344064037497596 },
        { sensor_id: 2, day_name: "Tuesday", time_of_day: "Noon", average_value: 40.66185719241782 },
        { sensor_id: 2, day_name: "Wednesday", time_of_day: "Morning", average_value: 41.530189972141045 },
        { sensor_id: 2, day_name: "Wednesday", time_of_day: "Night", average_value: 47.7083088353981 },
        { sensor_id: 2, day_name: "Wednesday", time_of_day: "Noon", average_value: 43.12404748642907 },
        { sensor_id: 3, day_name: "Friday", time_of_day: "Morning", average_value: 42.82110857157151 },
        { sensor_id: 3, day_name: "Friday", time_of_day: "Night", average_value: 47.47160554479405 },
        { sensor_id: 3, day_name: "Friday", time_of_day: "Noon", average_value: 41.12378303158654 },
        { sensor_id: 3, day_name: "Monday", time_of_day: "Morning", average_value: 39.641787935515964 },
        { sensor_id: 3, day_name: "Monday", time_of_day: "Night", average_value: 45.42240144039597 },
        { sensor_id: 3, day_name: "Monday", time_of_day: "Noon", average_value: 42.24880246512803 },
        { sensor_id: 3, day_name: "Saturday", time_of_day: "Morning", average_value: 39.11396908077543 },
        { sensor_id: 3, day_name: "Saturday", time_of_day: "Night", average_value: 43.63278209198694 },
        { sensor_id: 3, day_name: "Saturday", time_of_day: "Noon", average_value: 41.325882930535606 },
        { sensor_id: 3, day_name: "Sunday", time_of_day: "Morning", average_value: 41.514290291516645 },
        { sensor_id: 3, day_name: "Sunday", time_of_day: "Night", average_value: 46.72681065784166 },
        { sensor_id: 3, day_name: "Sunday", time_of_day: "Noon", average_value: 42.02656028958199 },
        { sensor_id: 3, day_name: "Thursday", time_of_day: "Morning", average_value: 39.62934982721227 },
        { sensor_id: 3, day_name: "Thursday", time_of_day: "Night", average_value: 46.29984387286714 },
        { sensor_id: 3, day_name: "Thursday", time_of_day: "Noon", average_value: 41.819719710181666 },
        { sensor_id: 3, day_name: "Tuesday", time_of_day: "Morning", average_value: 43.28453196570755 },
        { sensor_id: 3, day_name: "Tuesday", time_of_day: "Night", average_value: 46.11349764684455 },
        { sensor_id: 3, day_name: "Tuesday", time_of_day: "Noon", average_value: 43.407810654187266 },
        { sensor_id: 3, day_name: "Wednesday", time_of_day: "Morning", average_value: 41.0048577301752 },
        { sensor_id: 3, day_name: "Wednesday", time_of_day: "Night", average_value: 44.97868819407617 },
        { sensor_id: 3, day_name: "Wednesday", time_of_day: "Noon", average_value: 41.42654041350667 },
        { sensor_id: 4, day_name: "Friday", time_of_day: "Morning", average_value: 43.485617659121765 },
        { sensor_id: 4, day_name: "Friday", time_of_day: "Night", average_value: 46.004374413229655 },
        { sensor_id: 4, day_name: "Friday", time_of_day: "Noon", average_value: 38.90381682805537 },
        { sensor_id: 4, day_name: "Monday", time_of_day: "Morning", average_value: 42.47122620671137 },
        { sensor_id: 4, day_name: "Monday", time_of_day: "Night", average_value: 45.946886208321416 },
        { sensor_id: 4, day_name: "Monday", time_of_day: "Noon", average_value: 42.54971047137826 },
        { sensor_id: 4, day_name: "Saturday", time_of_day: "Morning", average_value: 43.62496864151943 },
        { sensor_id: 4, day_name: "Saturday", time_of_day: "Night", average_value: 45.94262192480478 },
        { sensor_id: 4, day_name: "Saturday", time_of_day: "Noon", average_value: 43.352395476259055 },
        { sensor_id: 4, day_name: "Sunday", time_of_day: "Morning", average_value: 41.135223316697356 },
        { sensor_id: 4, day_name: "Sunday", time_of_day: "Night", average_value: 45.878464176481074 },
        { sensor_id: 4, day_name: "Sunday", time_of_day: "Noon", average_value: 43.09540616673144 },
        { sensor_id: 4, day_name: "Thursday", time_of_day: "Morning", average_value: 43.65528310258339 },
        { sensor_id: 4, day_name: "Thursday", time_of_day: "Night", average_value: 46.06234568530408 },
        { sensor_id: 4, day_name: "Thursday", time_of_day: "Noon", average_value: 41.153636728395846 },
        { sensor_id: 4, day_name: "Tuesday", time_of_day: "Morning", average_value: 42.57532894608729 },
        { sensor_id: 4, day_name: "Tuesday", time_of_day: "Night", average_value: 45.54460627663966 },
        { sensor_id: 4, day_name: "Tuesday", time_of_day: "Noon", average_value: 42.3535756684335 },
        { sensor_id: 4, day_name: "Wednesday", time_of_day: "Morning", average_value: 42.06738796069874 },
        { sensor_id: 4, day_name: "Wednesday", time_of_day: "Night", average_value: 45.95347020016461 },
        { sensor_id: 4, day_name: "Wednesday", time_of_day: "Noon", average_value: 40.59312321604399 },
        { sensor_id: 5, day_name: "Friday", time_of_day: "Morning", average_value: 42.00600638999025 },
        { sensor_id: 5, day_name: "Friday", time_of_day: "Night", average_value: 46.22990430081503 },
        { sensor_id: 5, day_name: "Friday", time_of_day: "Noon", average_value: 40.86995903331524 },
        { sensor_id: 5, day_name: "Monday", time_of_day: "Morning", average_value: 41.61404843269103 },
        { sensor_id: 5, day_name: "Monday", time_of_day: "Night", average_value: 44.79816867637028 },
        { sensor_id: 5, day_name: "Monday", time_of_day: "Noon", average_value: 40.89950100603635 },
        { sensor_id: 5, day_name: "Saturday", time_of_day: "Morning", average_value: 42.993446655302755 },
        { sensor_id: 5, day_name: "Saturday", time_of_day: "Night", average_value: 45.37804105991546 },
        { sensor_id: 5, day_name: "Saturday", time_of_day: "Noon", average_value: 41.62397106812991 },
        { sensor_id: 5, day_name: "Sunday", time_of_day: "Morning", average_value: 40.642103415479674 },
        { sensor_id: 5, day_name: "Sunday", time_of_day: "Night", average_value: 44.871351865872654 },
        { sensor_id: 5, day_name: "Sunday", time_of_day: "Noon", average_value: 41.53099058613303 },
        { sensor_id: 5, day_name: "Thursday", time_of_day: "Morning", average_value: 40.090866056660154 },
        { sensor_id: 5, day_name: "Thursday", time_of_day: "Night", average_value: 45.60842228003684 },
        { sensor_id: 5, day_name: "Thursday", time_of_day: "Noon", average_value: 44.57639105953939 },
        { sensor_id: 5, day_name: "Tuesday", time_of_day: "Morning", average_value: 44.00782783387717 },
        { sensor_id: 5, day_name: "Tuesday", time_of_day: "Night", average_value: 45.623714395684004 },
        { sensor_id: 5, day_name: "Tuesday", time_of_day: "Noon", average_value: 42.983051561374765 },
        { sensor_id: 5, day_name: "Wednesday", time_of_day: "Morning", average_value: 40.495290179798786 },
        { sensor_id: 5, day_name: "Wednesday", time_of_day: "Night", average_value: 45.52966836031063 },
        { sensor_id: 5, day_name: "Wednesday", time_of_day: "Noon", average_value: 44.33067016558076 },
        { sensor_id: 6, day_name: "Friday", time_of_day: "Morning", average_value: 41.94583771495114 },
        { sensor_id: 6, day_name: "Friday", time_of_day: "Night", average_value: 45.95174060723757 },
        { sensor_id: 6, day_name: "Friday", time_of_day: "Noon", average_value: 42.556797262959584 },
        { sensor_id: 6, day_name: "Monday", time_of_day: "Morning", average_value: 43.16418055891261 },
        { sensor_id: 6, day_name: "Monday", time_of_day: "Night", average_value: 46.162775756056725 },
        { sensor_id: 6, day_name: "Monday", time_of_day: "Noon", average_value: 41.68954237683964 },
        { sensor_id: 6, day_name: "Saturday", time_of_day: "Morning", average_value: 43.25912748564382 },
        { sensor_id: 6, day_name: "Saturday", time_of_day: "Night", average_value: 45.334634352904104 },
        { sensor_id: 6, day_name: "Saturday", time_of_day: "Noon", average_value: 41.61701844772911 },
        { sensor_id: 6, day_name: "Sunday", time_of_day: "Morning", average_value: 43.63120654160404 },
        { sensor_id: 6, day_name: "Sunday", time_of_day: "Night", average_value: 46.90278078320989 },
        { sensor_id: 6, day_name: "Sunday", time_of_day: "Noon", average_value: 42.94103402632232 },
        { sensor_id: 6, day_name: "Thursday", time_of_day: "Morning", average_value: 40.54751916709792 },
        { sensor_id: 6, day_name: "Thursday", time_of_day: "Night", average_value: 45.019447045061646 },
        { sensor_id: 6, day_name: "Thursday", time_of_day: "Noon", average_value: 39.38441334484223 },
        { sensor_id: 6, day_name: "Tuesday", time_of_day: "Morning", average_value: 40.06515020038102 },
        { sensor_id: 6, day_name: "Tuesday", time_of_day: "Night", average_value: 45.91520241051153 },
        { sensor_id: 6, day_name: "Tuesday", time_of_day: "Noon", average_value: 40.88919508464624 },
        { sensor_id: 6, day_name: "Wednesday", time_of_day: "Morning", average_value: 41.415408541601515 },
        { sensor_id: 6, day_name: "Wednesday", time_of_day: "Night", average_value: 46.55558937146531 },
        { sensor_id: 6, day_name: "Wednesday", time_of_day: "Noon", average_value: 41.135326470400614 },
        { sensor_id: 7, day_name: "Friday", time_of_day: "Morning", average_value: 41.2594081667437 },
        { sensor_id: 7, day_name: "Friday", time_of_day: "Night", average_value: 46.03841946226383 },
        { sensor_id: 7, day_name: "Friday", time_of_day: "Noon", average_value: 41.380803576491175 },
        { sensor_id: 7, day_name: "Monday", time_of_day: "Morning", average_value: 41.31154304835245 },
        { sensor_id: 7, day_name: "Monday", time_of_day: "Night", average_value: 44.86233375042523 },
        { sensor_id: 7, day_name: "Monday", time_of_day: "Noon", average_value: 43.329240978665545 },
        { sensor_id: 7, day_name: "Saturday", time_of_day: "Morning", average_value: 40.43307196827532 },
        { sensor_id: 7, day_name: "Saturday", time_of_day: "Night", average_value: 46.72511147853811 },
        { sensor_id: 7, day_name: "Saturday", time_of_day: "Noon", average_value: 44.3895843888637 },
        { sensor_id: 7, day_name: "Sunday", time_of_day: "Morning", average_value: 42.726429899268915 },
        { sensor_id: 7, day_name: "Sunday", time_of_day: "Night", average_value: 46.44579497244151 },
        { sensor_id: 7, day_name: "Sunday", time_of_day: "Noon", average_value: 43.66313399370867 },
        { sensor_id: 7, day_name: "Thursday", time_of_day: "Morning", average_value: 42.34373278833976 },
        { sensor_id: 7, day_name: "Thursday", time_of_day: "Night", average_value: 47.79176465382508 },
        { sensor_id: 7, day_name: "Thursday", time_of_day: "Noon", average_value: 41.747545945085356 },
        { sensor_id: 7, day_name: "Tuesday", time_of_day: "Morning", average_value: 40.611194252358615 },
        { sensor_id: 7, day_name: "Tuesday", time_of_day: "Night", average_value: 44.40256932583786 },
        { sensor_id: 7, day_name: "Tuesday", time_of_day: "Noon", average_value: 40.83213911158179 },
        { sensor_id: 7, day_name: "Wednesday", time_of_day: "Morning", average_value: 42.35674601452159 },
        { sensor_id: 7, day_name: "Wednesday", time_of_day: "Night", average_value: 45.601358808257444 },
        { sensor_id: 7, day_name: "Wednesday", time_of_day: "Noon", average_value: 41.656542289507925 },
        { sensor_id: 8, day_name: "Friday", time_of_day: "Morning", average_value: 40.3328934601102 },
        { sensor_id: 8, day_name: "Friday", time_of_day: "Night", average_value: 44.79242450088988 },
        { sensor_id: 8, day_name: "Friday", time_of_day: "Noon", average_value: 42.5384560846916 },
        { sensor_id: 8, day_name: "Monday", time_of_day: "Morning", average_value: 43.016188234872665 },
        { sensor_id: 8, day_name: "Monday", time_of_day: "Night", average_value: 44.64878915262649 },
        { sensor_id: 8, day_name: "Monday", time_of_day: "Noon", average_value: 39.66418599140838 },
        { sensor_id: 8, day_name: "Saturday", time_of_day: "Morning", average_value: 40.64148200276758 },
        { sensor_id: 8, day_name: "Saturday", time_of_day: "Night", average_value: 45.68757664391348 },
        { sensor_id: 8, day_name: "Saturday", time_of_day: "Noon", average_value: 41.007516293187265 },
        { sensor_id: 8, day_name: "Sunday", time_of_day: "Morning", average_value: 42.353356255981076 },
        { sensor_id: 8, day_name: "Sunday", time_of_day: "Night", average_value: 45.712329324515274 },
        { sensor_id: 8, day_name: "Sunday", time_of_day: "Noon", average_value: 42.27918890977688 },
        { sensor_id: 8, day_name: "Thursday", time_of_day: "Morning", average_value: 43.4287673043043 },
        { sensor_id: 8, day_name: "Thursday", time_of_day: "Night", average_value: 46.735146471601425 },
        { sensor_id: 8, day_name: "Thursday", time_of_day: "Noon", average_value: 42.057767598636445 },
        { sensor_id: 8, day_name: "Tuesday", time_of_day: "Morning", average_value: 42.97580193397037 },
        { sensor_id: 8, day_name: "Tuesday", time_of_day: "Night", average_value: 47.55953427179474 },
        { sensor_id: 8, day_name: "Tuesday", time_of_day: "Noon", average_value: 39.82915051930948 },
        { sensor_id: 8, day_name: "Wednesday", time_of_day: "Morning", average_value: 40.198950924486006 },
        { sensor_id: 8, day_name: "Wednesday", time_of_day: "Night", average_value: 47.439155581149066 },
        { sensor_id: 8, day_name: "Wednesday", time_of_day: "Noon", average_value: 41.86451567331108 },
        { sensor_id: 9, day_name: "Friday", time_of_day: "Morning", average_value: 41.000705188871 },
        { sensor_id: 9, day_name: "Friday", time_of_day: "Night", average_value: 44.24714131354385 },
        { sensor_id: 9, day_name: "Friday", time_of_day: "Noon", average_value: 41.05885999832528 },
        { sensor_id: 9, day_name: "Monday", time_of_day: "Morning", average_value: 41.728916767691764 },
        { sensor_id: 9, day_name: "Monday", time_of_day: "Night", average_value: 46.84764436972857 },
        { sensor_id: 9, day_name: "Monday", time_of_day: "Noon", average_value: 39.550060173498885 },
        { sensor_id: 9, day_name: "Saturday", time_of_day: "Morning", average_value: 40.365749055062075 },
        { sensor_id: 9, day_name: "Saturday", time_of_day: "Night", average_value: 45.40161711020289 },
        { sensor_id: 9, day_name: "Saturday", time_of_day: "Noon", average_value: 41.67432752433786 },
        { sensor_id: 9, day_name: "Sunday", time_of_day: "Morning", average_value: 40.31064204292795 },
        { sensor_id: 9, day_name: "Sunday", time_of_day: "Night", average_value: 45.451836797266154 },
        { sensor_id: 9, day_name: "Sunday", time_of_day: "Noon", average_value: 38.92251502520432 },
        { sensor_id: 9, day_name: "Thursday", time_of_day: "Morning", average_value: 40.46648058940615 },
        { sensor_id: 9, day_name: "Thursday", time_of_day: "Night", average_value: 45.2818641308213 },
        { sensor_id: 9, day_name: "Thursday", time_of_day: "Noon", average_value: 40.40575753840316 },
        { sensor_id: 9, day_name: "Tuesday", time_of_day: "Morning", average_value: 40.62539250589416 },
        { sensor_id: 9, day_name: "Tuesday", time_of_day: "Night", average_value: 44.950939377875 },
        { sensor_id: 9, day_name: "Tuesday", time_of_day: "Noon", average_value: 42.26827591982385 },
        { sensor_id: 9, day_name: "Wednesday", time_of_day: "Morning", average_value: 40.21846135950448 },
        { sensor_id: 9, day_name: "Wednesday", time_of_day: "Night", average_value: 47.789654949486916 },
        { sensor_id: 9, day_name: "Wednesday", time_of_day: "Noon", average_value: 42.88393374247022 },
        { sensor_id: 10, day_name: "Friday", time_of_day: "Morning", average_value: 41.73587353602856 },
        { sensor_id: 10, day_name: "Friday", time_of_day: "Night", average_value: 46.49087627327633 },
        { sensor_id: 10, day_name: "Friday", time_of_day: "Noon", average_value: 42.51182711614731 },
        { sensor_id: 10, day_name: "Monday", time_of_day: "Morning", average_value: 39.89574787469448 },
        { sensor_id: 10, day_name: "Monday", time_of_day: "Night", average_value: 46.12999241398009 },
        { sensor_id: 10, day_name: "Monday", time_of_day: "Noon", average_value: 41.922906330777224 },
        { sensor_id: 10, day_name: "Saturday", time_of_day: "Morning", average_value: 41.03919580335657 },
        { sensor_id: 10, day_name: "Saturday", time_of_day: "Night", average_value: 44.295637432369155 },
        { sensor_id: 10, day_name: "Saturday", time_of_day: "Noon", average_value: 42.85030418615968 },
        { sensor_id: 10, day_name: "Sunday", time_of_day: "Morning", average_value: 40.29766524629882 },
        { sensor_id: 10, day_name: "Sunday", time_of_day: "Night", average_value: 49.04644767157013 },
        { sensor_id: 10, day_name: "Sunday", time_of_day: "Noon", average_value: 41.24846917518956 },
        { sensor_id: 10, day_name: "Thursday", time_of_day: "Morning", average_value: 41.55171261971774 },
        { sensor_id: 10, day_name: "Thursday", time_of_day: "Night", average_value: 46.67644026956843 },
        { sensor_id: 10, day_name: "Thursday", time_of_day: "Noon", average_value: 41.82975830456923 },
        { sensor_id: 10, day_name: "Tuesday", time_of_day: "Morning", average_value: 42.68176111575374 },
        { sensor_id: 10, day_name: "Tuesday", time_of_day: "Night", average_value: 43.928065823030174 },
        { sensor_id: 10, day_name: "Tuesday", time_of_day: "Noon", average_value: 42.78159128503882 },
        { sensor_id: 10, day_name: "Wednesday", time_of_day: "Morning", average_value: 39.3459571992853 },
        { sensor_id: 10, day_name: "Wednesday", time_of_day: "Night", average_value: 45.963911102622845 },
        { sensor_id: 10, day_name: "Wednesday", time_of_day: "Noon", average_value: 43.161246429304875 }
    ];

    const sensorIds = [...new Set(data.map(item => item.sensor_id))];
    const dayNames = [...new Set(data.map(item => item.day_name))];

    // State for selected sensor_id and day_name
    const [selectedSensorId, setSelectedSensorId] = useState(sensorIds[0]);
    const [selectedDayName, setSelectedDayName] = useState(dayNames[0]);

    // Filter data based on selected sensor_id and day_name
    const filteredData = data.filter(item => item.sensor_id === selectedSensorId && item.day_name === selectedDayName);


    // Prepare the data for Plotly
    const timeOfDayOrder = ['Morning', 'Noon', 'Night'];
    const weekdayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Sort the data based on the custom order
    const sortedData = data.sort((a, b) => timeOfDayOrder.indexOf(a.time_of_day) - timeOfDayOrder.indexOf(b.time_of_day));
    const timesOfDay = filteredData.map(item => item.time_of_day);
    const averageValues = filteredData.map(item => item.average_value);

    return (
        <div>
            <div>
                <label htmlFor="sensor-id">Select Sensor ID: </label>
                <select
                    id="sensor-id"
                    value={selectedSensorId}
                    onChange={e => setSelectedSensorId(Number(e.target.value))}
                >
                    {sensorIds.map(sensorId => (
                        <option key={sensorId} value={sensorId}>
                            Sensor {sensorId}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="day-name">Select Day: </label>
                <select
                    id="day-name"
                    value={selectedDayName} // Set the value to the selected day from state
                    onChange={e => setSelectedDayName(e.target.value)} // Update the state when a day is selected
                >
                    {weekdayOrder.map(day => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>
            </div>

            <Plot
                data={[
                    {
                        type: 'scatter',
                        x: timeOfDayOrder,
                        y: averageValues,
                        marker: { color: 'black' },
                        xaxis: {title: "Time of Day"}
                    },
                ]}
                layout={{
                    title: `Sensor Data: Average Value by Time of Day (Sensor ${selectedSensorId}, ${selectedDayName})`,
                    xaxis: {
                        title: 'Time of Day',
                    },
                    yaxis: {
                        title: 'Average Value (cm)',
                    },
                }}
            />
        </div>
    );
};

export default SensorDataPlot;
