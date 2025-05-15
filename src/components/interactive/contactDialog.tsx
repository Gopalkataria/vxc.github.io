import { GLOBAL } from "@/lib/variables";
import { MailOpen, Copy, ClipboardCheck, MapPin, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function ContactDialog() {
    const { administrativeEmail } = GLOBAL;
    const [copiedAdmin, setCopiedAdmin] = useState(false);
    const [copiedExec, setCopiedExec] = useState(false);
    const [copiedAlt, setCopiedAlt] = useState(false);

    const handleCopy = (text: string, setCopied: (value: boolean) => void) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default"><MailOpen /> <MapPin />Contact Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Contact Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    {/* Office Hours */}
                    <div className="flex items-start space-x-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="font-medium">Office Hours</p>
                            <p className="text-sm text-gray-600">Mondays: 4pm-5pm, Room 501, Himalaya D Block or by appointment.</p>
                        </div>
                    </div>
                    {/* Location */}
                    <div className="flex items-start space-x-2">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="font-medium">Location</p>
                            <p className="text-sm text-gray-600">Software Engineering Research Centre, Himalaya D Block, 5th Floor, Room No. 501</p>
                        </div>
                    </div>
                    {/* Address */}
                    <div className="flex items-start space-x-2">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="font-medium">Street Address</p>
                            <p className="text-sm text-gray-600">International Institute of Information Technology Hyderabad, Prof. C R Rao Road, Gachibowli, Hyderabad 500 032 INDIA</p>
                        </div>
                    </div>
                    {/* Email Section */}
                    <DialogDescription className="flex items-start space-x-2">
                        <User className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="font-medium">Administrative assistant for any queries</p>
                        </div>
                    </DialogDescription>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="email" className="sr-only">Email</Label>
                            <Input id="email" defaultValue={administrativeEmail} readOnly />
                        </div>
                        <Button size="sm" className="px-3" onClick={() => handleCopy(administrativeEmail, setCopiedAdmin)}>
                            {copiedAdmin ? <ClipboardCheck className="transform hover:scale-110" /> : <Copy className="transform hover:scale-110" />}
                        </Button>
                    </div>
                    {/* Executive Assistant */}
                    <DialogDescription className="flex items-start space-x-2">
                        <User className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="font-medium">Executive Assistant, for scheduling appointments</p>
                        </div>
                    </DialogDescription>
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="exec-assistant" className="sr-only">Executive Assistant</Label>
                        <Input id="exec-assistant" defaultValue="sahiti.potnuru@research.iiit.ac.in" readOnly />
                        <Button size="sm" className="px-3" onClick={() => handleCopy("sahiti.potnuru@research.iiit.ac.in", setCopiedExec)}>
                            {copiedExec ? <ClipboardCheck className="transform hover:scale-110" /> : <Copy className="transform hover:scale-110" />}
                        </Button>
                    </div>
                    {/* My Email */}
                    <DialogDescription className="flex items-start space-x-2">
                        <User className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="font-medium">Reach out to me directly</p>
                        </div>
                    </DialogDescription>
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="alt-email" className="sr-only">Alternate Email</Label>
                        <Input id="alt-email" defaultValue="venkatesh.choppella@iiit.ac.in" readOnly />
                        <Button size="sm" className="px-3" onClick={() => handleCopy("venkatesh.choppella@iiit.ac.in", setCopiedAlt)}>
                            {copiedAlt ? <ClipboardCheck className="transform hover:scale-110" /> : <Copy className="transform hover:scale-110" />}
                        </Button>
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
