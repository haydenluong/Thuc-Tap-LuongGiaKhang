TrainingPrograms: {
    fields: {
        title: { type: 'text', label: 'Tiêu đề', default: 'Ngành đào tạo', contentEditable: true },
        backgroundColor: { type: 'text', label: 'Màu nền section', default: '#ffffff' },

        titleStyle: {
            type: 'object',
                label: 'Style tiêu đề',
                    objectFields: {
                fontSize: {
                    type: 'custom',
                        label: 'Cỡ chữ (rem)',
                            render: ({ value, onChange }) => (
                                <div>
                                    <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4, color: '#374151' }}>Cỡ chữ (rem)</label>
                                    <input
                                        type="number"
                                        step="0.125"
                                        min="0"
                                        value={parseFloat(value) || ''}
                                        onChange={(e) => onChange(e.target.value ? `${e.target.value}rem` : '')}
                                        style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 15, width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                            ),
                    },
                color: { type: 'text', label: 'Màu chữ', default: '#1f2937' },
                fontWeight: {
                    type: 'select',
                        label: 'Đậm nhạt',
                            options: [
                                { label: 'Normal', value: 'normal' },
                                { label: 'Medium (500)', value: '500' },
                                { label: 'Semi Bold (600)', value: '600' },
                                { label: 'Bold (700)', value: 'bold' },
                                { label: 'Extra Bold (800)', value: '800' },
                            ],
                    },
                textAlign: {
                    type: 'select',
                        label: 'Căn chữ',
                            options: [
                                { label: 'Trái', value: 'left' },
                                { label: 'Giữa', value: 'center' },
                                { label: 'Phải', value: 'right' },
                            ],
                    },
            },
        },

        menuStyle: {
            type: 'object',
                label: 'Style menu tabs',
                    objectFields: {
                backgroundColor: { type: 'text', label: 'Màu nền', default: '#3b82f6' },
                color: { type: 'text', label: 'Màu chữ', default: '#ffffff' },
                fontSize: {
                    type: 'custom',
                        label: 'Cỡ chữ (rem)',
                            render: ({ value, onChange }) => (
                                <div>
                                    <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4, color: '#374151' }}>Cỡ chữ (rem)</label>
                                    <input
                                        type="number"
                                        step="0.125"
                                        min="0"
                                        value={parseFloat(value) || ''}
                                        onChange={(e) => onChange(e.target.value ? `${e.target.value}rem` : '')}
                                        style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 15, width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                            ),
                    },
                fontWeight: {
                    type: 'select',
                        label: 'Đậm nhạt',
                            options: [
                                { label: 'Normal', value: 'normal' },
                                { label: 'Medium (500)', value: '500' },
                                { label: 'Bold (700)', value: 'bold' },
                            ],
                    },
                textAlign: {
                    type: 'select',
                        label: 'Căn chữ',
                            options: [
                                { label: 'Trái', value: 'left' },
                                { label: 'Giữa', value: 'center' },
                                { label: 'Phải', value: 'right' },
                            ],
                    },
                borderRadius: {
                    type: 'custom',
                        label: 'Bo góc (px)',
                            render: ({ value, onChange }) => (
                                <div>
                                    <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4, color: '#374151' }}>Bo góc (px)</label>
                                    <input
                                        type="number"
                                        step="1"
                                        min="0"
                                        value={parseInt(value, 10) || ''}
                                        onChange={(e) => onChange(e.target.value ? `${e.target.value}px` : '')}
                                        style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 15, width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                            ),
                    },
            },
        },
        menus: {
            type: 'array',
                label: 'Menu tabs',
                    arrayFields: {
                name: { type: 'text', label: 'Tên menu', contentEditable: true },
                items: {
                    type: 'array',
                        label: 'Danh sách ngành',
                            arrayFields: {
                        title: { type: 'text', label: 'Tên ngành' },
                        icon: {
                            type: 'custom',
                                label: 'Icon URL (ảnh)',
                                    render: ({ value, onChange }) => {
                                        const IconPicker = () => {
                                            const [showPicker, setShowPicker] = useState(false);
                                            const handleSelect = (img) => {
                                                const raw = img.url || img.path || '';
                                                let p = raw.startsWith('/medias/') ? raw : raw.replace(/^\//, '');
                                                if (!p.startsWith('http') && !p.startsWith('/medias/')) {
                                                    p = `/medias/${p}`;
                                                }
                                                onChange(p);
                                                setShowPicker(false);
                                            };
                                            return (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                                    <button type="button" onClick={() => setShowPicker(true)} style={{ padding: '6px 12px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, cursor: 'pointer', width: 'fit-content' }}>
                                                        Chọn ảnh từ Media
                                                    </button>
                                                    <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="URL ảnh..." style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, width: '100%', boxSizing: 'border-box' }} />
                                                    {value && <img src={value} alt="preview" style={{ height: 48, objectFit: 'contain', borderRadius: 4, border: '1px solid #e5e7eb', alignSelf: 'flex-start' }} />}
                                                    {showPicker && <MediaPickerModal isOpen={showPicker} onClose={() => setShowPicker(false)} onSelect={handleSelect} />}
                                                </div>
                                            );
                                        };
                                        return <IconPicker />;
                                    },
                            },
                        iconShape: {
                            type: 'select',
                                label: 'Kiểu icon',
                                    options: [
                                        { label: 'Tròn', value: 'round' },
                                        { label: 'Vuông', value: 'square' },
                                    ],
                            },
                        link: { type: 'text', label: 'Link (mở tab mới)' },
                    },
                    getItemSummary: (item) => item.title || 'Item',
                    },
            },
            getItemSummary: (item) => item.name || 'Menu',
            },
    },
    defaultProps: {
        title: 'Ngành đào tạo',
            backgroundColor: '#ffffff',
                titleStyle: {
            fontSize: '2rem',
                color: '#1f2937',
                    fontWeight: 'bold',
                        textAlign: 'center',
            },
        menuStyle: {
            backgroundColor: '#3b82f6',
                color: '#ffffff',
                    fontSize: '0.875rem',
                        fontWeight: '500',
                            textAlign: 'center',
                                borderRadius: '30px',
            },
        menus: [
            { name: 'Trung cấp', items: [] },
            { name: 'Liên thông', items: [] },
            { name: 'Văn bằng 2', items: [] },
            { name: 'Đại học hệ từ xa', items: [] },
            { name: 'Sơ cấp', items: [] },
        ],
        },
    render: (props) => <TrainingProgramsComponent {...props} />,
    },
