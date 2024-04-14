function CreateButton({ title, onClick }: {title: string, onClick: (e?: any) => void}) {
    return (
        <button onClick={onClick}>
            {title}
        </button>
    );
}

export default CreateButton;
