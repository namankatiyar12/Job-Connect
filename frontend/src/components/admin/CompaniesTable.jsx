import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>
                A list of your recent registered companies
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow><TableCell>
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/200/300" />

                        
                    </Avatar>
                </TableCell>
                <TableCell>
                    Company Name
                </TableCell>
                <TableCell>17-01-2025</TableCell>
                <TableCell className="text-right cursor-pointer">
                    <Popover>
                        <PopoverTrigger>
                            <MoreHorizontal/>
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                            <div className="flex items-center justify-between">
                                <Edit2 className="w-4"/>
                                <span>Edit</span>
                            </div>

                        </PopoverContent>
                    </Popover>
                </TableCell></TableRow>
            </TableBody>
        </Table>
    </div>
  )
}

export default CompaniesTable