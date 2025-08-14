

const DefaultTemplate = ({
    firstname,
    surname,
    city,
    country,
    pincode,
    phone,
    email
}) => {
    return (
        <div className="flex justify-center items-start min-h-screen bg-chooseTemplateBg TopPadding p-6">            
            <div style={{ minHeight: 500 }} className="bg-white w-full max-w-3xl p-8 shadow-lg rounded-lg">
                {/* Top section */}
                <div className="flex justify-between items-start">
                    {/* Left: Name + Location */}
                    <div>
                        <h2 className="text-2xl font-bold">
                            {firstname || "Firstname"} {surname || "Surname"}
                        </h2>
                        <p className="text-gray-700">
                            {city || "City"}, {country || "Country"}, {pincode || "Pin Code"}
                        </p>
                    </div>

                    {/* Right: Contact Info */}
                    <div className="text-right">
                        <p className="text-gray-700">{phone || "Phone"}</p>
                        <p className="text-gray-700">{email || "Email"}</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="mt-6 space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold">Summary</h2>
                        <p className="text-gray-600">
                            {/* Static summary text */}
                            A short professional summary goes here.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">Experience</h2>
                        <p className="text-gray-600">
                            {/* Static experience text */}
                            Experience details will be listed here.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">Skills</h2>
                        <p className="text-gray-600">
                            {/* Static skills text */}
                            Your skills will be listed here.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">Education</h2>
                        <p className="text-gray-600">
                            {/* Static education text */}
                            Your education details will go here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DefaultTemplate;