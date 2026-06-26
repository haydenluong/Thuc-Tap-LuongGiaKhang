import React, { useState } from 'react';

const TrainingProgramsComponent = ({
    title = 'Ngành đào tạo',
    titleStyle = {},
    menuStyle = {},
    menus = [],
    backgroundColor = '#ffffff',
}) => {
    const [activeMenu, setActiveMenu] = useState(0);

    const defaultTitleStyle = {
        fontSize: '2rem',
        color: '#1f2937',
        fontWeight: 'bold',
        textAlign: 'center',
    };
    const ts = { ...defaultTitleStyle, ...titleStyle };

    const defaultMenuStyle = {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        fontSize: '0.875rem',
        fontWeight: '500',
        textAlign: 'center',
        borderRadius: '30px',
    };
    const ms = { ...defaultMenuStyle, ...menuStyle };

    const defaultItemStyle = {
        iconShape: 'round',
    };

    const activeItems = menus[activeMenu]?.items || [];

    return (
        <section
            className="w-full py-8 px-4"
            style={{ backgroundColor }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <h2
                    style={{
                        fontSize: ts.fontSize,
                        color: ts.color,
                        fontWeight: ts.fontWeight,
                        textAlign: ts.textAlign,
                        marginBottom: '1.5rem',
                    }}
                >
                    {title}
                </h2>

                {/* Menu Tabs */}
                {menus.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
                        {menus.map((menu, idx) => {
                            const isActive = idx === activeMenu;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveMenu(idx)}
                                    className="transition-all duration-200"
                                    style={{
                                        backgroundColor: isActive ? ms.backgroundColor : `${ms.backgroundColor}66`,
                                        color: ms.color,
                                        fontSize: ms.fontSize,
                                        fontWeight: ms.fontWeight,
                                        textAlign: ms.textAlign,
                                        borderRadius: ms.borderRadius,
                                        padding: '8px 20px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        opacity: isActive ? 1 : 0.7,
                                    }}
                                >
                                    {menu.name || `Menu ${idx + 1}`}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Items Grid - 6 columns */}
                {activeItems.length > 0 ? (
                    <div
                        className="grid gap-4"
                        style={{
                            gridTemplateColumns: 'repeat(6, 1fr)',
                        }}
                    >
                        {activeItems.map((item, idx) => {
                            const is = { ...defaultItemStyle, ...item };
                            return (
                                <a
                                    key={idx}
                                    href={item.link || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-1 no-underline"
                                    style={{ backgroundColor: 'transparent', color: 'inherit' }}
                                >
                                    {/* Icon */}
                                    {item.icon && (
                                        <img
                                            src={item.icon}
                                            alt={item.title || ''}
                                            className="object-cover"
                                            style={{
                                                width: is.iconShape === 'round' ? '56px' : '56px',
                                                height: '56px',
                                                borderRadius: is.iconShape === 'round' ? '50%' : '4px',
                                            }}
                                        />
                                    )}
                                    {/* Title */}
                                    <span
                                        className="text-center text-sm leading-tight"
                                        style={{ color: '#374151', fontWeight: 400 }}
                                    >
                                        {item.title || `Item ${idx + 1}`}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-400">
                        <p>Chưa có ngành đào tạo nào. Thêm item vào menu.</p>
                    </div>
                )}
            </div>

            {/* Editor-only responsive override */}
            <style>{`
        @media (max-width: 1024px) {
          .grid[style*="grid-template-columns: repeat(6"] {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .grid[style*="grid-template-columns: repeat(6"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .grid[style*="grid-template-columns: repeat(6"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
        </section>
    );
};

export default TrainingProgramsComponent;
