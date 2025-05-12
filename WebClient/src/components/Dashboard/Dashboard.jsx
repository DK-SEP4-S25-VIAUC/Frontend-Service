import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import TemperatureWidget from '../temperature/TemperatureWidget.jsx';
import QuickControlCard from "../quick-controls/QuickControlCard.jsx";
import HumidityWidget from '../soil-humidity/SoilHumidityInput.jsx';
import SoilWidget from '../soil-humidity/SoilHumidityLatestCard.jsx';
import { LockIcon, UnlockIcon } from 'lucide-react';
import WateringPredictionCard from "../watering-prediction/WateringPredictionCard.jsx";
import WaterReadingLatestCard from "../water-reading/WaterReadingLatestCard.jsx";
import SoilHumidityAlert from "../soil-humidity/SoilHumidityAlert.jsx";

// Apply the width provider to create a responsive grid
const ResponsiveGridLayout = WidthProvider(Responsive);

// Utility function to generate responsive layouts
function generateResponsiveLayouts(widgetKeys, customSettings = {}) {
    // Default settings for different breakpoints
    const defaultSettings = {
        lg: { cols: 24, itemsPerRow: 6, width: 4, height: 3 },
        md: { cols: 6, itemsPerRow: 2, width: 3, height: 2 },
        sm: { cols: 6, itemsPerRow: 1, width: 6, height: 2 },
        xs: { cols: 1, itemsPerRow: 1, width: 1, height: 2 }
    };

    // Merge custom settings with defaults
    const settings = { ...defaultSettings, ...customSettings };

    // Initialize result object
    const layouts = {
        lg: [],
        md: [],
        sm: [],
        xs: []
    };

    // Define widget-specific constraints
    const widgetConstraints = {
        'temperature': { minW: 3, minH: 3, maxW: 4, maxH: 4 },
        'humidity': { minW: 2, minH: 1, maxW: 6, maxH: 3 },
        'controls': { minW: 3, minH: 2 },
        'soil': { minW: 2, minH: 2, maxW: 4, maxH: 3 },
        'light': { minW: 2, minH: 2, maxW: 6, maxH: 6 },
        'co2': { minW: 2, minH: 2, maxW: 4, maxH: 3 },
        'water-level': { minW: 2, minH: 2, maxW: 6, maxH: 6 },
        'battery': { minW: 1, minH: 1, maxW: 2, maxH: 2 },
        'weather': { minW: 3, minH: 0, maxW: 5, maxH: 12 },
        'stats': { minW: 3, minH: 2, maxW: 8, maxH: 8 }
    };

    // Generate layouts for each breakpoint
    Object.keys(layouts).forEach(breakpoint => {
        const { cols, itemsPerRow, width, height } = settings[breakpoint];

        widgetKeys.forEach((key, index) => {
            // Calculate position
            const row = Math.floor(index / itemsPerRow);
            const col = index % itemsPerRow;

            // For xs, special case - stack vertically
            const x = breakpoint === 'xs' ? 0 : col * width;
            const y = row * height;

            // Get constraints for this widget
            const constraints = widgetConstraints[key] || { minW: 1, minH: 1 };

            // Add to layouts with appropriate constraints
            layouts[breakpoint].push({
                i: key,
                x,
                y,
                w: breakpoint === 'xs' ? cols : width,
                h: height,
                minW: constraints.minW || 1,
                minH: constraints.minH || 1,
                ...(constraints.maxW && { maxW: constraints.maxW }),
                ...(constraints.maxH && { maxH: constraints.maxH })
            });
        });
    });

    return layouts;
}

function Dashboard() {
    // State to control dragging/resizing
    const [isEditable, setIsEditable] = useState(false);

    // Define all widget keys - add all the widgets you'll have in your dashboard
    const widgetKeys = [
        'temperature',
        'humidity',
        'soil',
        'light',
        'light-2',
        'water-level',
        'water',
        'controls',
        'weather',
        'stats'
    ];

    // Generate layouts automatically or load from localStorage
    const [layouts, setLayouts] = useState(() => {
        // Try to load saved layouts from localStorage
        const savedLayouts = localStorage.getItem('dashboardLayouts');
        if (savedLayouts) {
            try {
                return JSON.parse(savedLayouts);
            } catch (e) {
                console.error('Failed to parse saved layouts', e);
            }
        }

        // Fall back to generated layouts
        return generateResponsiveLayouts(widgetKeys);
    });

    const handleLayoutChange = (currentLayout, allLayouts) => {
        // Only save layouts if editing is enabled
        if (isEditable) {
            // Save the new layouts to state and localStorage
            setLayouts(allLayouts);
            localStorage.setItem('dashboardLayouts', JSON.stringify(allLayouts));
        }
    };

    // Toggle edit mode
    const toggleEditMode = () => {
        setIsEditable(!isEditable);
    };

    // Function to reset layouts to default
    const resetLayouts = () => {
        const newLayouts = generateResponsiveLayouts(widgetKeys);
        setLayouts(newLayouts);
        localStorage.setItem('dashboardLayouts', JSON.stringify(newLayouts));
    };

    // Component map to match keys with components
    const widgetComponents = {
        'temperature': <TemperatureWidget />,
        'humidity': <HumidityWidget />,
        'controls': <QuickControlCard />,
        'soil': <SoilWidget />,
        'water-level': <WateringPredictionCard />,
        'weather': <WaterReadingLatestCard />,
        'stats': <SoilHumidityAlert />
        // Additional components can be added as they're developed
    };

    return (
        <div className="dashboard-container p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

                <div className="flex gap-2">
                    {/* Reset button */}
                    {isEditable && (
                        <button
                            onClick={resetLayouts}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
                        >
                            Reset Layout
                        </button>
                    )}

                    {/* Toggle button for editing mode */}
                    <button
                        onClick={toggleEditMode}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg 
                            ${isEditable
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'}`}
                    >
                        {isEditable
                            ? <><UnlockIcon size={18} /> Editing Enabled</>
                            : <><LockIcon size={18} /> Locked</>
                        }
                    </button>
                </div>
            </div>

            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
                cols={{ lg: 24, md: 12, sm: 6, xs: 1 }}
                margin={[16, 16]}
                rowHeight={40}
                onLayoutChange={handleLayoutChange}
                isDraggable={isEditable}
                isResizable={isEditable}
                resizeHandles={['se']}
                compactType=""
                preventCollision={false}
            >
                {/* Dynamically render all widgets based on the keys */}
                {widgetKeys.map(key => (
                    <div key={key} className="widget-container">
                        {widgetComponents[key] ||
                            <div className="h-full w-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-center p-4">
                                Widget: {key}
                            </div>
                        }
                    </div>
                ))}
            </ResponsiveGridLayout>
        </div>
    );
}

export default Dashboard;