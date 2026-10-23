"use client"

import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { SectionCards, StatCard } from "@/components/ui/stat-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import {
  DialogBodyInfo,
  DialogBodyLotInput,
  DialogBodyOptionButtons,
  DialogBodyOptionList,
  DialogBodyTable,
  DialogBodyTextarea,
} from "@/components/ui/dialog-body"
import { Row, Section } from "./section"

// DialogBody 미리보기용 더미 데이터
const tableRows = [
  { id: "1", lot: "L-240101", item: "초코 비스킷 120g", qty: "1,200", unit: "EA" },
  { id: "2", lot: "L-240102", item: "카스타드 6입", qty: "860", unit: "BOX" },
  { id: "3", lot: "L-240103", item: "빼빼로 오리지널", qty: "2,400", unit: "EA" },
  { id: "4", lot: "L-240104", item: "몽쉘 12입", qty: "540", unit: "BOX" },
]
const options = [
  { value: "1", label: "선택 항목 1" },
  { value: "2", label: "선택 항목 2" },
  { value: "3", label: "선택 항목 3" },
]

const Slot = () => (
  <div className="flex h-20 items-center justify-center rounded-md border border-border bg-alpha-muted-50 text-xs text-muted-foreground">
    내용 자리
  </div>
)

export function BatchDisplay() {
  return (
    <>
      <Section id="badge" title="Badge · Avatar · Tooltip · Separator · Skeleton" figma="- Badges · Avatars · Tooltips · Separators · Skeletons">
        <Row label="Badge">
          <Badge>배지</Badge>
          <Badge variant="secondary">배지</Badge>
          <Badge variant="destructive">배지</Badge>
          <Badge variant="outline">배지</Badge>
        </Row>
        <Row label="Avatar">
          <Avatar><AvatarFallback>관</AvatarFallback></Avatar>
        </Row>
        <Row label="Tooltip (마우스를 올려 보기)">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger asChild><Button variant="outline" size="sm">{side}</Button></TooltipTrigger>
              <TooltipContent side={side}>툴팁</TooltipContent>
            </Tooltip>
          ))}
        </Row>
        <Row label="Separator">
          <div className="flex h-6 items-center gap-3 text-sm">설비<Separator orientation="vertical" />라인<Separator orientation="vertical" />공정</div>
          <Separator className="max-w-80" />
        </Row>
        <Row label="Skeleton">
          <Skeleton className="h-4 w-60" />
        </Row>
      </Section>

      <Section id="card" title="Card · StatCard · SectionCards" figma="- Cards (23:6 · 38:344 · 38:345) · 첫 StatCard = tone=emphasis">
        <Row>
          <Card className="w-96">
            <CardHeader>
              <CardTitle>카드 제목</CardTitle>
              <CardDescription>카드 설명</CardDescription>
            </CardHeader>
            <CardContent><Slot /></CardContent>
            <CardFooter><Button>버튼</Button></CardFooter>
          </Card>
        </Row>
        <SectionCards>
          <StatCard tone="emphasis" label="오늘 주문" value="1,250건" badge="+12.5%" trend="up" summary="지난주 대비 증가" detail="최근 6개월 기준" />
          <StatCard label="불량률" value="1.8%" badge="-20%" trend="down" summary="지난주 대비 감소" detail="최근 6개월 기준" />
          <StatCard label="가동률" value="92%" />
          <StatCard label="에너지" value="3,420kWh" badge="+4%" />
        </SectionCards>
      </Section>

      <Section id="tabs" title="Tabs" figma="- Tabs (24:15 · 51:139 · 24:23)">
        <Tabs defaultValue="info" className="w-96">
          <TabsList>
            <TabsTrigger value="info">기본 정보</TabsTrigger>
            <TabsTrigger value="log">변경 이력</TabsTrigger>
            <TabsTrigger value="alarm">알람</TabsTrigger>
          </TabsList>
          <TabsContent value="info"><Slot /></TabsContent>
          <TabsContent value="log"><Slot /></TabsContent>
          <TabsContent value="alarm"><Slot /></TabsContent>
        </Tabs>
        <Tabs defaultValue="info">
          <TabsList variant="line">
            <TabsTrigger value="info">기본 정보</TabsTrigger>
            <TabsTrigger value="log">변경 이력</TabsTrigger>
            <TabsTrigger value="alarm">알람</TabsTrigger>
            <TabsTrigger value="set" disabled>설정</TabsTrigger>
          </TabsList>
        </Tabs>
      </Section>

      <Section id="overlay" title="Popover · Dialog · AlertDialog · Sheet · DialogBody" figma="- Popovers · Dialogs · Sheets · DialogBody (4047:18)">
        <Row>
          <Popover>
            <PopoverTrigger asChild><Button variant="outline">팝오버</Button></PopoverTrigger>
            <PopoverContent><Slot /></PopoverContent>
          </Popover>
          <Dialog>
            <DialogTrigger asChild><Button variant="outline">팝업</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>팝업 제목</DialogTitle>
                <DialogDescription>팝업 설명을 입력합니다.</DialogDescription>
              </DialogHeader>
              <Slot />
              <DialogFooter>
                <DialogClose asChild><Button variant="outline">취소</Button></DialogClose>
                <Button>저장</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="outline">확인 팝업</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>항목을 삭제할까요?</AlertDialogTitle>
                <AlertDialogDescription>삭제한 항목은 되돌릴 수 없어요.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction variant="destructive">삭제</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {(["right", "left", "top", "bottom"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild><Button variant="outline">시트 {side}</Button></SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>패널 제목</SheetTitle>
                  <SheetDescription>패널 설명을 입력합니다.</SheetDescription>
                </SheetHeader>
                <div className="px-4"><Slot /></div>
                <SheetFooter>
                  <Button>저장</Button>
                  <Button variant="outline">취소</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </Row>
        <div className="grid gap-6 lg:grid-cols-2">
          <Row label="DialogBodyTable">
            <DialogBodyTable
              rows={tableRows}
              getRowId={(r) => r.id}
              columns={[
                { key: "lot", header: "LOT" },
                { key: "item", header: "품목" },
                { key: "qty", header: "수량", className: "text-right" },
                { key: "unit", header: "단위" },
              ]}
            />
          </Row>
          <Row label="DialogBodyInfo">
            <DialogBodyInfo
              items={[
                { label: "작업지시", value: "WO-2410-0012" },
                { label: "품목", value: "초코 비스킷 120g" },
                { label: "라인", value: "2라인" },
              ]}
            />
          </Row>
          <Row label="DialogBodyLotInput">
            <DialogBodyLotInput />
          </Row>
          <Row label="DialogBodyTextarea">
            <DialogBodyTextarea aria-label="내용" />
          </Row>
          <Row label="DialogBodyOptionList">
            <DialogBodyOptionList options={options} defaultValue="1" aria-label="항목 선택" />
          </Row>
          <Row label="DialogBodyOptionButtons">
            <DialogBodyOptionButtons
              options={[
                { value: "a", label: "방식 1" },
                { value: "b", label: "방식 2" },
                { value: "c", label: "방식 3" },
              ]}
            />
          </Row>
        </div>
      </Section>
    </>
  )
}
